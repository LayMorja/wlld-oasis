import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account was successfully updated");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}
