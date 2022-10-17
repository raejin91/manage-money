import * as yup from 'yup';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import FloatInput from '../SignIn/FloatInput';
import SelectElement from './SelectElement';
import { Formik } from 'formik';
import { updateWallet } from '../../features/walletSlice';

const EditModal = ({ show, handleClose, wallet, currencyList, userId, dispatch }) => {
  return (
    <Formik
      initialValues={{
        name: wallet.name,
        balance: wallet.balance,
        currency: wallet.currency,
      }}
      validationSchema={yup.object().shape({
        name: yup.string().min(6, 'Must have at least 6 chars').required('Required'),
        balance: yup.number(),
        currency: yup.string().required('Required'),
      })}
      enableReinitialize={true}
      onSubmit={values => {
        dispatch(updateWallet({ ...values, id: wallet.id, balance: +values.balance, userId }));
        handleClose('edit');
      }}>
      {({ handleSubmit }) => (
        <Modal
          show={show}
          onHide={() => {
            handleClose('edit');
          }}
          centered>
          <Modal.Header className='fw-bold fs-4'>Edit wallet</Modal.Header>
          <Modal.Body>
            <Form className='px-5' noValidate onSubmit={handleSubmit} id='editWallet'>
              <FloatInput id='walletName' name='name' label={`Wallet's name`} type='text' />
              <Row>
                <Form.Group as={Col} md={7}>
                  <SelectElement data={currencyList} name='currency' label='Currency' />
                </Form.Group>
                <Form.Group as={Col} md={5}>
                  <FloatInput id='balance' name='balance' label='Initial balance' type='text' />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary fw-semibold'
              onClick={() => {
                handleClose('edit');
              }}>
              Close
            </Button>
            <Button variant='success' type='submit' as='input' value='Save' form='editWallet' />
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default EditModal;
