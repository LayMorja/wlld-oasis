import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(Number(id)),
    onSuccess: (data) => {
      toast.success(`Booking was successfully deleted`);

      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteBooking, isDeletingBooking };
}
