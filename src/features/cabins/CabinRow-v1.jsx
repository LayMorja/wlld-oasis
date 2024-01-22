import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", sans-serif;
`;

const Price = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, discount, image, maxCapacity, name, regularPrice, description } =
    cabin;
  // Temporary state for editing form
  // const [showForm, setShowForm] = useState(false);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isInserting: isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      image,
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>Fit up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <button  disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <Modal.Open opens="update-form">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="update-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="confirm-delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="Cabin"
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>Duplicate</Menus.Button>
            <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
            <Menus.Button
              icon={<HiTrash />}
              onClick={() => deleteCabin(id)}
              disabled={isDeleting}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
