import toast from "react-hot-toast";
import Empty from "../../ui/Empty.jsx";
import Menus from "../../ui/Menus.jsx";
import Pagination from "../../ui/Pagination.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import BookingRow from "./BookingRow.jsx";
import useBookings from "./useBookings.js";

function BookingTable() {
  const { bookings, isLoading, error, isError, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (isError) return toast.error(error.message);
  if (!bookings?.length) return <Empty resource="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
