import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    // We should provide multiple arguments as object
    mutationFn: ({ newCabinData, id }) => createAddCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating: isUpdating, updateCabin: updateCabin };
}
