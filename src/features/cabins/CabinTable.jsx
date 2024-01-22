import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import toast from "react-hot-toast";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination.jsx";
import Empty from "../../ui/Empty.jsx";

const filterDiscount = (item) => item.discount > 0;
const filterNoDiscount = (item) => item.discount === 0;

function CabinTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cabins, isLoading, isError, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (isError) return toast.error(error.message);
  if (!cabins.length) return <Empty resource={"cabins"}></Empty>;

  // 1. Filtering
  const filterValue = searchParams.get("discount") || "all";
  let filteredData;
  if (filterValue === "with-discount")
    filteredData = cabins.filter((item) => item.discount > 0);
  if (filterValue === "no-discount")
    filteredData = cabins.filter((item) => item.discount === 0);
  if (!filterValue || filterValue === "all") filteredData = cabins;
  // const filteredData =
  //   filterValue === "with-discount"
  //     ? cabins.filter(filterDiscount)
  //     : filterValue === "no-discount"
  //       ? cabins.filter(filterNoDiscount)
  //       : cabins;

  // 2. Sorting
  const sortBy = searchParams.get("sortBy") || "regularPrice-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedData;
  if (field === "name")
    sortedData = filteredData.sort(
      (a, b) => a.name.localeCompare(b.name) * modifier,
    );
  else
    sortedData = filteredData.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedData}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
