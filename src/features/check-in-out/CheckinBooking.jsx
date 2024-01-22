import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox.jsx";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import useBooking from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import toast from "react-hot-toast";
import Checkbox from "../../ui/Checkbox.jsx";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers.js";
import useCheckin from "./useCheckin.js";
import { useSettings } from "../settings/useSettings.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [isConfirmedPaid, setIsConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading, isError, error } = useBooking();
  const { checkin, isCheckinIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  useEffect(() => {
    if (booking?.isPaid) setIsConfirmedPaid(true);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;
  if (isError) return toast.error(error.message);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!isConfirmedPaid) return;
    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    else checkin({ bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            onChange={() => {
              setAddBreakfast((state) => !state);
              setIsConfirmedPaid(false);
            }}
            checked={addBreakfast}
          >
            Include optional breakfast for{" "}
            {`${formatCurrency(optionalBreakfastPrice)}`}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          disabled={isConfirmedPaid}
          onChange={() => setIsConfirmedPaid((confirm) => !confirm)}
          checked={isConfirmedPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!isConfirmedPaid || isCheckinIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
