import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createNewUser } from '../../features/userSlice';
import { useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import MainLayout from '../layouts/Main';
import FloatInput from '../SignIn/FloatInput';
import { Button, Col, Row } from 'react-bootstrap';

const SignUp = () => {
  const { error, userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={yup.object().shape({
          username: yup.string().min(5, 'Must have at least 5 chars').required('Required'),
          email: yup.string().email('Invalid email').required('Required'),
          password: yup.string().min(6, 'Must have at least 6 chars').required('Required'),
        })}
        enableReinitialize={true}
        onSubmit={values => {
          dispatch(
            createNewUser({
              ...values,
              firstname: '',
              lastname: '',
            })
          );
          setTimeout(() => {
            navigate('/');
          }, 500);
        }}>
        {({ handleSubmit }) => (
          <Row className='h-75 w-100 d-flex justify-content-center m-0'>
            <Col xs={12} md={10} lg={6} xl={6} xxl={5}>
              <Form
                className='container-fluid bg-dark bg-gradient mt-3 p-5 rounded-4 d-flex flex-column justify-content-center'
                noValidate
                onSubmit={handleSubmit}>
                <h1 className='text-center fw-bold mb-3 text-white text-uppercase'>Register</h1>
                {error && (
                  <div className='text-center mb-3 text-light text-bg-danger p-3 rounded'>
                    {error}
                  </div>
                )}
                <FloatInput id='floatUsername' name='username' label='Username' type='text' />
                <FloatInput id='floatEmail' name='email' label='Email' type='email' />
                <FloatInput id='floatPassword' name='password' label='Password' type='password' />
                <Button
                  variant='primary w-100 fw-bold fs-2 mb-3'
                  as='input'
                  type='submit'
                  value='Register'
                />
                <h5 className='text-light text-center'>
                  Have an account ? <Link to='/sign-in'>Sign in</Link>
                </h5>
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </MainLayout>
  );
};

export default SignUp;
