import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import convertDecimal from '../../hooks/convertDecimal';
import './transaction.css';

const InOutFlow = () => {
  const { currency } = useSelector(state => state.wallet.walletInfo);
  const { inflow, outflow } = useSelector(state => state.transaction);
  return (
    <Container className='d-flex flex-column justify-content-center border-bottom' id='inOutFlow'>
      <Row className='mb-2 px-3'>
        <Col xs={6}>Inflow:</Col>
        <Col xs={6} className='text-end text-primary'>
          {`${convertDecimal(inflow)} ${currency}`}
        </Col>
      </Row>
      <Row className='mb-2 px-3'>
        <Col xs={6}>Outflow:</Col>
        <Col xs={6} className='text-end text-danger'>
          {`${convertDecimal(outflow)} ${currency}`}
        </Col>
      </Row>
      <Row className='border-top border-dark mx-2'>
        <Col xs={12} className='text-end p-2 fw-semibold'>
          {`${convertDecimal(inflow - outflow)} ${currency}`}
        </Col>
      </Row>
    </Container>
  );
};

export default InOutFlow;
