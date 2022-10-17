import MainLayout from '../layouts/Main';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTransactionByWalletId } from '../../features/transactionSlice';
import { Col, Container, Row } from 'react-bootstrap';
import converDecimal from '../../hooks/convertDecimal';
import BarChart from './BarChart';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const { username } = useSelector(state => state.user.userInfo);
  const { walletInfo: wallet } = useSelector(state => state.wallet);
  const { transactions, inflow, outflow } = useSelector(state => state.transaction);
  const [chartOption, setChartOption] = useState({});
  const [daysHadTransaction, setDayHadTransaction] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) navigate('/');
    if (transactions.length === 0) dispatch(getTransactionByWalletId(wallet.id));
    setDayHadTransaction(
      transactions
        .reduce((result, item) => {
          if (result.length === 0) return [item.date];
          else if (!result.includes(item.date)) {
            return [...result, item.date];
          } else {
            return result;
          }
        }, [])
        .sort()
    );
    setChartOption({
      responsive: true,
      maintainAspectRatio: false,
    });
  }, [wallet.id, transactions.length]);

  return (
    <MainLayout className='d-flex justify-content-center pb-3'>
      <Container className='bg-light p-2 h-75 w-75'>
        <Row>
          <Col xs={12} className='d-flex flex-column align-items-center'>
            <span className='fst-italic text-secondary'>Balance</span>
            <span className='fs-3 fw-bold'>{`${wallet.balance && converDecimal(wallet.balance)} ${
              wallet.currency
            }`}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BarChart
              transactions={transactions}
              labels={daysHadTransaction}
              options={chartOption}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} className='d-flex flex-column align-items-center'>
            <span className='fst-italic text-secondary'>Income</span>
            <span className='fs-5 text-primary'>{`${inflow && converDecimal(inflow)} ${
              wallet.currency
            }`}</span>
          </Col>
          <Col xs={6} className='d-flex flex-column align-items-center'>
            <span className='fst-italic text-secondary'>Expense</span>
            <span className='fs-5 text-danger'>{`${outflow && converDecimal(outflow)} ${
              wallet.currency
            }`}</span>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Report;
