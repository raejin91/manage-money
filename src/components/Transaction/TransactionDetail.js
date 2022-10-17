import { useEffect } from 'react';
import { Button, ButtonGroup, CloseButton, Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import convertDecimal from '../../hooks/convertDecimal';
import useShowDetailDate from '../../hooks/useShowDetailDate';
import transactionColor from '../../hooks/transactionColor';
import * as img from '../../imgs';
import DeleteTransactionModal from './DeleteTransactionModal';
import './transaction.css';

const TransactionDetail = ({
  show,
  handleClose,
  handleShow,
  dispatch,
  setIsEdit,
  showDeleteModal,
}) => {
  const { currency } = useSelector(state => state.wallet.walletInfo);
  const categories = useSelector(state => state.categories);
  const transaction = useSelector(state => state.transaction.selectedTransaction);

  useEffect(() => {
    if (show && !transaction.id) handleClose('transactionDetail');
  });
  // Get category info
  const getCategoryInfo = type =>
    categories[type].filter(item => item.id === transaction.categoryId)[0];

  // render img function
  const imgRender = type => {
    const category = getCategoryInfo(type);
    return (
      <Image
        style={{ height: 64, width: 64 }}
        rounded
        src={img[category.img]}
        alt={category.name}
      />
    );
  };

  return (
    <Col xs={0} sm={7} className={`p-0 ps-3 transactionDetail ${show ? 'show' : 'hide'}`}>
      <DeleteTransactionModal
        handleClose={handleClose}
        dispatch={dispatch}
        show={showDeleteModal}
        transaction={transaction}
      />
      <Container className='bg-light'>
        <Row className='py-2 border-bottom mb-3'>
          <Col sm={1} className='d-flex justify-content-center align-items-center p-0'>
            <CloseButton
              onClick={() => {
                handleClose('transactionDetail');
              }}
            />
          </Col>
          <Col sm={6} className='d-flex justify-content-center align-items-center p-0'>
            <h4 className='fw-semibold m-0'>Transaction Detail</h4>
          </Col>
          <ButtonGroup as={Col} sm={5} className='p-0 pe-3'>
            <Button
              variant='outline-success'
              className='w-50 fw-semibold'
              onClick={() => {
                setIsEdit(true);
                handleShow('newTransaction');
              }}>
              Edit
            </Button>
            <Button
              variant='outline-danger'
              className='w-50 fw-semibold'
              onClick={() => {
                handleShow('deleteTransaction');
              }}>
              Delete
            </Button>
          </ButtonGroup>
        </Row>
        <Row>
          <Col sm={2}>{transaction.type && categories && imgRender(transaction.type)}</Col>
          <Col sm={10}>
            <Container className='border-bottom mb-2'>
              <h5 className='fw-bold'>
                {transaction.type && getCategoryInfo(transaction.type).name}
              </h5>
              <p>{useShowDetailDate(transaction.date)}</p>
            </Container>
            <Container className='mb-3'>
              <span className='text-secondary fst-italic'>
                {transaction.note && transaction.note}
              </span>
              <h3 className={`${transactionColor(transaction.type, transaction.categoryId)}`}>{`${
                transaction.type === 'income' ? '+' : '-'
              }${
                transaction.amount && convertDecimal(transaction.amount.toString())
              } ${currency}`}</h3>
            </Container>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default TransactionDetail;
