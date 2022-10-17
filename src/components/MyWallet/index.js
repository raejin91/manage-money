import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import convertDecimal from '../../hooks/convertDecimal';
import MainLayout from '../layouts/Main';
import AdjustBalanceModal from './AdjustBalanceModal';
import CreateNewWallet from './CreateNewWallet';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const MyWallet = () => {
  const { currencyList, walletInfo } = useSelector(state => state.wallet);
  const { id: userId, username, email } = useSelector(state => state.user.userInfo);

  const [showModal, setShowModal] = useState({
    edit: false,
    delete: false,
    adjustBalance: false,
  });

  const handleClose = modalName => setShowModal({ ...showModal, [modalName]: false });
  const handleShow = modalName => setShowModal({ ...showModal, [modalName]: true });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate('/');
  }, [userId, navigate, dispatch]);

  if (!walletInfo.id) return <CreateNewWallet currencyList={currencyList} userId={userId} />;
  else
    return (
      <MainLayout>
        <DeleteModal
          show={showModal.delete}
          handleClose={handleClose}
          walletName={walletInfo.name}
          dispatch={dispatch}
          walletId={walletInfo.id}
        />
        <EditModal
          show={showModal.edit}
          handleClose={handleClose}
          wallet={walletInfo}
          userId={userId}
          currencyList={currencyList}
          dispatch={dispatch}
        />
        <AdjustBalanceModal
          show={showModal.adjustBalance}
          handleClose={handleClose}
          wallet={walletInfo}
          userId={userId}
          dispatch={dispatch}
        />
        <Row className='w-100 h-50 d-flex justify-content-center m-0'>
          <Col className='bg-light p-0' xs={12} md={10} xl={6}>
            <Row className='px-md-5 px-xs-2 m-0 border-bottom h-25'>
              <Col xs={4} className='h-100 d-flex align-items-center p-0'>
                <h3 className='fw-semibold text-center'>Wallet Detail</h3>
              </Col>
              <Col xs={8} className='h-100 d-flex align-items-center justify-content-end'>
                <ButtonGroup className='w-75'>
                  <Button
                    variant='outline-success'
                    className='w-50 fw-semibold'
                    onClick={() => {
                      handleShow('edit');
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant='outline-danger'
                    className='w-50 fw-semibold'
                    onClick={() => {
                      handleShow('delete');
                    }}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Col className='border-bottom px-5 m-0 h-25 d-flex flex-column justify-content-center'>
              <h3 className='fw-semibold'>{walletInfo.name ? walletInfo.name : ''}</h3>
              <p className='m-0'>
                {`${convertDecimal(walletInfo.balance.toString())} ${
                  walletInfo.currency
                    ? currencyList.filter(curr => curr[0] === walletInfo.currency).map(e => e[1])
                    : ''
                }`}
              </p>
            </Col>
            <Col className='border-bottom px-5 m-0 h-25 d-flex flex-column justify-content-center'>
              <h3 className='fw-semibold'>User</h3>
              <p className='m-0'>{username}</p>
              <p className='m-0'>{email}</p>
            </Col>
            <Col className='h-25 d-flex align-items-center justify-content-center p-0'>
              <button
                className='btn btn-outline-primary h-50 w-50 fw-semibold'
                onClick={() => {
                  handleShow('adjustBalance');
                }}>
                Adjust Balance
              </button>
            </Col>
          </Col>
        </Row>
      </MainLayout>
    );
};

export default MyWallet;
