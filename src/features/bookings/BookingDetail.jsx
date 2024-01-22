import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import Button from "../../ui/Button.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Empty from "../../ui/Empty.jsx";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal.jsx";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner.jsx";
import Tag from "../../ui/Tag.jsx";
import useCheckout from "../check-in-out/useCheckout.js";
import BookingDataBox from "./BookingDataBox.jsx";
import useBooking from "./useBooking.js";
import useDeleteBooking from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { booking, isLoading, isError } = useBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (isError) {
    return <Empty resource="booking" />;
  }
  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="confirm-delete">
            <Button icon={<HiTrash />} variation="danger">
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: moveBack(),
                })
              }
              disabled={isDeletingBooking}
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
              moveBack();
            }}
          >
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
