import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteTransactionById } from '../../features/transactionSlice';
import { transactionBalanceChange } from '../../features/walletSlice';

const DeleteTransactionModal = ({ show, handleClose, dispatch, transaction }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose('deleteTransaction');
      }}>
      <Modal.Header className='fw-bold fs-4' closeButton>
        Confirm Deletion
      </Modal.Header>
      <Modal.Body>Delete this transaction ?</Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary fw-semibold w-25'
          onClick={() => {
            handleClose('deleteTransaction');
          }}>
          No
        </Button>
        <Button
          variant='danger fw-semibold w-25'
          onClick={() => {
            dispatch(deleteTransactionById(transaction.id));
            setTimeout(() => {
              dispatch(
                transactionBalanceChange({
                  ...transaction,
                  type:
                    transaction.type === 'income'
                      ? 'expense'
                      : transaction.type === 'expense'
                      ? 'income'
                      : transaction.type === 'debtLoan' &&
                        (transaction.categoryId === 1 || transaction.categoryId === 2)
                      ? 'expense'
                      : 'income',
                })
              );
            }, 200);
            handleClose('deleteTransaction');
          }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTransactionModal;
