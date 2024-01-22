import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createAddCabin(newCabin, id) {
  // If image is a string, it is already in supabase bucket (editing case)
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    hasImage ? newCabin.image : newCabin.image.name
  }`.replaceAll("/", "");
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");
  // a. Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // b. Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error.message);
    throw new Error("Cabin could not be added");
  }
  // In case if we already have an image, we don't need to upload it to the bucket
  if (hasImage) return data;
  // Upload image to the bucket, providing image name
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created",
    );
  }

  return data;
}
