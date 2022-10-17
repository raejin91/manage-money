import { Field, Formik } from 'formik';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { createNewTransaction, editTransaction } from '../../features/transactionSlice';
import { transactionBalanceChange } from '../../features/walletSlice';
import useCurrentDate from '../../hooks/useCurrentDate';
import FloatInput from '../SignIn/FloatInput';
import CategoryModal from './CategoryModal';

const NewTransactionModal = ({ show, handleClose, wallet, dispatch, isEdit, setIsEdit }) => {
  const { selectedTransaction: transaction } = useSelector(state => state.transaction);
  const [showCategory, setShowCategory] = useState(false);
  const categories = useSelector(state => state.categories);

  const date = useCurrentDate();

  const initialValues = !isEdit
    ? {
        walletId: wallet.name,
        categoryId: '',
        type: '',
        amount: 0,
        date,
        note: '',
      }
    : {
        ...transaction,
        walletId: wallet.name,
        categoryId: categories[transaction.type].filter(
          item => item.id === transaction.categoryId
        )[0].name,
      };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={yup.object().shape({
        categoryId: yup.string().required().nullable(),
        type: yup.string(),
        amount: yup.number().required().min(1),
        date: yup.date().required(),
        note: yup.string(),
      })}
      onSubmit={(values, { resetForm }) => {
        const cateId = categories[values.type].filter(item => item.name === values.categoryId)[0]
          .id;
        const requestData = {
          ...values,
          categoryId: cateId,
          walletId: wallet.id,
          amount: +values.amount,
        };
        if (!isEdit) {
          dispatch(createNewTransaction(requestData));
          setTimeout(() => {
            dispatch(transactionBalanceChange());
          }, 200);
        } else {
          dispatch(editTransaction(requestData));
          setTimeout(() => {
            dispatch(transactionBalanceChange());
          }, 200);
        }
        resetForm();
        setIsEdit(false);
        handleClose('newTransaction');
      }}>
      {({ handleSubmit, setFieldValue, values }) => (
        <Modal
          size='lg'
          show={show}
          onHide={() => {
            handleClose('newTransaction');
          }}>
          <CategoryModal
            values={values}
            setFieldValue={setFieldValue}
            show={showCategory}
            handleClose={() => {
              setShowCategory(false);
            }}
            categories={categories}
          />
          <Modal.Header className='fw-bold fs-4'>{`${
            !isEdit ? 'Add' : 'Edit'
          } transaction`}</Modal.Header>
          <Modal.Body>
            <Form className='px-5' noValidate onSubmit={handleSubmit} id='newTransaction'>
              <Field hidden name='type' type='text' />
              <Row>
                <Form.Group as={Col} md={4}>
                  <FloatInput
                    id='walletId'
                    name='walletId'
                    label={`Wallet's name`}
                    type='text'
                    disabled={true}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <FloatInput
                    name='categoryId'
                    label='Category'
                    type='text'
                    onClick={() => {
                      setShowCategory(true);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <FloatInput id='amount' name='amount' label='Amount' type='text' />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={4}>
                  <FloatInput id='date' name='date' label='Date' type='date' />
                </Form.Group>
                <Form.Group as={Col} md={8}>
                  <FloatInput id='note' name='note' label='Note' type='text' />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary fw-semibold'
              onClick={() => {
                setIsEdit(false);
                handleClose('newTransaction');
              }}>
              Close
            </Button>
            <Button variant='success' type='submit' as='input' value='Save' form='newTransaction' />
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default NewTransactionModal;
