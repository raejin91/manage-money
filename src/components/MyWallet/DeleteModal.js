import { Button, Modal } from 'react-bootstrap';
import { deleteWallet } from '../../features/walletSlice';

const DeleteModal = ({ show, handleClose, walletName, walletId, dispatch }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose('delete');
      }}
      centered>
      <Modal.Header className='fw-bold fs-4'>
        Do you want to delete wallet "{walletName}"?
      </Modal.Header>
      <Modal.Body>
        You will also delete all of its transactions, budgets, events, bills and this action cannot
        be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary fw-semibold'
          onClick={() => {
            handleClose('delete');
          }}>
          Close
        </Button>
        <Button
          variant='danger fw-semibold'
          onClick={() => {
            dispatch(deleteWallet(walletId));
            setTimeout(() => {
              handleClose('delete');
            }, 500);
          }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
