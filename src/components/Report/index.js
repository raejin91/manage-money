import MainLayout from '../layouts/Main';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTransactionByWalletId } from '../../features/transactionSlice';
import { Col, Row } from 'react-bootstrap';
import converDecimal from '../../hooks/convertDecimal';
import BarChart from './BarChart';
import { useNavigate } from 'react-router-dom';
import RangeDatePicker from './RangeDatePicker';
import { getReportByMonth } from '../../features/reportSlice';

const Report = () => {
  const { username } = useSelector(state => state.user.userInfo);
  const { walletInfo: wallet } = useSelector(state => state.wallet);
  const { transactions, inflow, outflow } = useSelector(state => state.transaction);
  const { datasets, display } = useSelector(state => state.report);
  const [chartOption, setChartOption] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) navigate('/');
    if (transactions.length === 0) dispatch(getTransactionByWalletId(wallet.id));
    if (datasets.length === 0) dispatch(getReportByMonth(new Date().getMonth()));
    setChartOption({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });
  }, [wallet.id, transactions.length]);

  console.log(datasets);
  console.log(display);

  return (
    <MainLayout className='d-flex justify-content-center pb-3'>
      <Row className='w-100 d-flex justify-content-center'>
        <Col xs={12} sm={10} md={9} lg={8} className='bg-light p-2 h-100'>
          <Row>
            <Col xs={12}>
              <RangeDatePicker />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='d-flex flex-column align-items-center'>
              <span className='fst-italic text-secondary'>Net Income</span>
              <span className='fs-3 fw-bold'>{`${converDecimal(display.income + display.expense)} ${
                wallet.currency
              }`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='mb-2'>
              <BarChart options={chartOption} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className='d-flex flex-column align-items-center'>
              <span className='fst-italic text-secondary'>Income</span>
              <span className='fs-5 text-primary'>{`${converDecimal(display.income)} ${
                wallet.currency
              }`}</span>
            </Col>
            <Col xs={6} className='d-flex flex-column align-items-center'>
              <span className='fst-italic text-secondary'>Expense</span>
              <span className='fs-5 text-danger'>{`${converDecimal(Math.abs(display.expense))} ${
                wallet.currency
              }`}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Report;
