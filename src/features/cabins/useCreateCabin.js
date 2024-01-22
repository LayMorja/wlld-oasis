import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Separate mutate functions to edit/create
  const { isLoading: isInserting, mutate: createCabin } = useMutation({
    mutationFn: (data) => createAddCabin(data),
    onSuccess: () => {
      toast.success("New cabin was successfully added");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isInserting, createCabin };
}
