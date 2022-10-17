import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getUserByUsername } from '../../features/userSlice';

import MainLayout from '../layouts/Main';
import FloatInput from './FloatInput';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';

const SignIn = () => {
  const { error, userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.username) navigate('/');
  }, [navigate, userInfo]);

  return (
    <MainLayout>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          username: yup
            .string()
            .min(5, 'Must have at least 5 chars')
            .required('Required'),
          password: yup
            .string()
            .min(6, 'Must have at least 6 chars')
            .required('Required'),
        })}
        enableReinitialize={true}
        onSubmit={values => {
          dispatch(getUserByUsername(values));
        }}
      >
        {({ handleSubmit }) => (
          <Row className='h-75 w-100 d-flex justify-content-center m-0'>
            <Col
              xs={12}
              md={10}
              lg={6}
              xl={6}
              xxl={5}
            >
              <Form
                className='container-fluid bg-dark bg-gradient mt-3 p-5 rounded-4 d-flex flex-column justify-content-center'
                noValidate
                onSubmit={handleSubmit}
              >
                <h1 className='text-center fw-bold mb-5 text-white text-uppercase'>
                  sign in
                </h1>
                {error && (
                  <Alert className='text-center mb-3 text-light text-bg-danger p-3 rounded'>
                    {error}
                  </Alert>
                )}
                <FloatInput
                  id='floatUsername'
                  name='username'
                  label='Username'
                  type='text'
                />
                <FloatInput
                  id='floatPassword'
                  name='password'
                  label='Password'
                  type='password'
                />
                <Button
                  variant='primary'
                  className='w-100 fw-bold fs-2 mb-3'
                  as='input'
                  type='submit'
                  value='Sign in'
                />
                <h5 className='text-light text-center'>
                  Don't have an account ? <Link to='/sign-up'>Register</Link>
                </h5>
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </MainLayout>
  );
};

export default SignIn;
