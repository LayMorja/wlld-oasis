import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.js";
import Stat from "./Stat.jsx";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((total, cur) => total + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((total, cur) => total + cur.numNights, 0) /
    (cabinCount * numDays);

  return (
    <>
      <Stat
        value={numBookings}
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        value={formatCurrency(totalSales)}
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={checkins}
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        value={Math.round(occupation * 100) + "%"}
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
