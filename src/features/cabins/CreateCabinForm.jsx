import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import { useCreateCabin } from "./useCreateCabin.js";
import { useUpdateCabin } from "./useUpdateCabin.js";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // We should separate cases of editing and creating
  // Custom hooks for each of cases
  const { isInserting, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  // Status of work (loading in both cases)
  const isWorking = isInserting || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit;
  // If editing => we have cabin to edit (do not create new one)
  const isEditingSession = Boolean(editId);

  const {
    // Register new fields
    register,
    // Cover function
    handleSubmit,
    // Handling errors
    formState: { errors },
    // Reset form (dirty values)
    reset,
    // Get current values from the entire form
    getValues,
    watch,
  } = useForm({
    // If editing => provide default values from existing cabin
    defaultValues: isEditingSession ? editValues : {},
  });

  const onSubmit = (data) => {
    console.log(data);
    // If we have an address already, just provide it to function
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // For editing, we must know ID to compare data table rows
    if (isEditingSession)
      // We should provide multiple arguments as object
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    // Otherwise we can just create new row
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue="002"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={4}
          disabled={isWorking}
          {...register("maxCapacity", {
            required: { value: true, message: "This field is required" },
            min: { value: 1, message: "Capacity should be at least 1" },
            max: { value: 8, message: "Capacity should be less or equal to 8" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={500}
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues("regularPrice")) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue="test"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditingSession ? false : "This filed is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          disabled={isWorking}
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? "Edit" : "Add"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
