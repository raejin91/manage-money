import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactionByWalletId } from '../../features/transactionSlice';
import MainLayout from '../layouts/Main';
import NewTransactionModal from './NewTransactionModal';
import TransactionDetail from './TransactionDetail';
import TransactionList from './TransactionList';
import './transaction.css';
import InOutFlow from './InOutFlow';

const Transaction = () => {
  const [showModal, setShowModal] = useState({
    newTransaction: false,
    transactionDetail: false,
    deleteTransaction: false,
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleClose = modalName => setShowModal({ ...showModal, [modalName]: false });
  const handleShow = modalName => setShowModal({ ...showModal, [modalName]: true });

  const { id: userId } = useSelector(state => state.user.userInfo);
  const { walletInfo } = useSelector(state => state.wallet);
  const { transactions } = useSelector(state => state.transaction);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate('/');
    if (transactions.length === 0) dispatch(getTransactionByWalletId(walletInfo.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInfo.id]);

  return (
    <MainLayout>
      <NewTransactionModal
        dispatch={dispatch}
        wallet={walletInfo}
        show={showModal.newTransaction}
        handleClose={handleClose}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
      <Row className='w-100 h-75 d-flex m-0 justify-content-center'>
        <Col xs={12} sm={5} xl={5} className='p-0 h-100 transactionListContainer'>
          <Container className='bg-light p-0 h-100 overflow-hidden'>
            <Row className='px-sm-5 px-3 py-3 m-0 border-bottom' style={{ height: '10%' }}>
              <Col xs={12} className='h-100 d-flex align-items-center justify-content-end p-0'>
                <Button
                  variant='outline-success fw-semibold'
                  type='button'
                  onClick={() => {
                    handleShow('newTransaction');
                  }}>
                  Add transaction
                </Button>
              </Col>
            </Row>
            <InOutFlow />
            <TransactionList
              transactionList={transactions}
              currency={walletInfo.currency}
              handleShow={handleShow}
            />
          </Container>
        </Col>
        <TransactionDetail
          show={showModal.transactionDetail}
          handleClose={handleClose}
          handleShow={handleShow}
          setIsEdit={setIsEdit}
          dispatch={dispatch}
          showDeleteModal={showModal.deleteTransaction}
        />
      </Row>
    </MainLayout>
  );
};

export default Transaction;
