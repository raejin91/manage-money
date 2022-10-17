import * as yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import FloatInput from '../SignIn/FloatInput';
import { Formik } from 'formik';
import { adjustBalance } from '../../features/walletSlice';

const AdjustBalanceModal = ({ wallet, userId, dispatch, handleClose, show }) => {
  return (
    <Formik
      initialValues={{
        name: wallet.name,
        balance: wallet.balance,
        currency: wallet.currency,
      }}
      validationSchema={yup.object().shape({
        balance: yup.number(),
      })}
      enableReinitialize={true}
      onSubmit={values => {
        dispatch(adjustBalance(+values.balance));
        handleClose('adjustBalance');
      }}>
      {({ handleSubmit }) => (
        <Modal
          show={show}
          onHide={() => {
            handleClose('adjustBalance');
          }}
          centered>
          <Modal.Header className='fw-bold fs-4'>Adjust balance</Modal.Header>
          <Modal.Body>
            <Form className='px-5' noValidate onSubmit={handleSubmit} id='adjustBalance'>
              <FloatInput
                id='walletName'
                name='name'
                label={`Wallet's name`}
                type='text'
                disabled={true}
              />
              <FloatInput id='balance' name='balance' label='Initial balance' type='text' />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary fw-semibold'
              onClick={() => {
                handleClose('adjustBalance');
              }}>
              Close
            </Button>
            <Button variant='success' type='submit' as='input' value='Save' form='adjustBalance' />
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default AdjustBalanceModal;
