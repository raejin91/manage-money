import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import MainLayout from '../layouts/Main';
import { useDispatch } from 'react-redux';
import { createWallet } from '../../features/walletSlice';
import FloatInput from '../SignIn/FloatInput';
import SelectElement from './SelectElement';

const CreateNewWallet = ({ currencyList, userId }) => {
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <Container className='mt-3 bg-light rounded-4 p-3 w-75'>
        <h3 className='border-bottom mb-3 border-dark pb-3'>Add a wallet first</h3>
        <Formik
          initialValues={{
            name: '',
            balance: 0,
            currency: '',
          }}
          validationSchema={yup.object().shape({
            name: yup.string().min(6, 'Must have at least 6 chars').required('Required'),
            balance: yup.number(),
            currency: yup.string().required('Required'),
          })}
          enableReinitialize={true}
          validateOnMount={true}
          onSubmit={values => {
            dispatch(
              createWallet({
                ...values,
                balance: parseFloat(values.balance),
                userId,
              })
            );
          }}>
          {({ handleSubmit, isValid }) => (
            <Form className='py-3 px-5' noValidate onSubmit={handleSubmit}>
              <FloatInput id='walletName' name='name' label={`Wallet's name`} type='text' />
              <Row className='mb-3'>
                <Form.Group as={Col} md={6}>
                  <SelectElement data={currencyList} name='currency' label='Currency' />
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <FloatInput id='balance' name='balance' label='Initial balance' type='text' />
                </Form.Group>
              </Row>
              <Button
                variant='success'
                type='submit'
                as='input'
                value='Save'
                size='lg'
                className='w-100'
                disabled={!isValid}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </MainLayout>
  );
};

export default CreateNewWallet;
