import { Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectingTransactionById } from '../../features/transactionSlice';
import convertDecimal from '../../hooks/convertDecimal';
import transactionColor from '../../hooks/transactionColor';
import transactionNumberType from '../../hooks/transactionNumberType';
import * as img from '../../imgs';
import './transaction.css';

const TransactionItem = ({ transaction, currency, handleShow }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const { id: selectedId } = useSelector(state => state.transaction.selectedTransaction);
  // Get category info
  const getCategoryInfo = type =>
    categories[type].filter(item => item.id === transaction.categoryId)[0];

  // render img function
  const imgRender = type => {
    const category = getCategoryInfo(type);
    return (
      <Image
        style={{ height: 40, width: 40 }}
        rounded
        src={img[category.img]}
        alt={category.name}
      />
    );
  };
  return (
    <Row
      className={`transactionItem px-3 py-2 m-0 border-bottom`}
      key={transaction.id}
      onClick={() => {
        if (!selectedId || selectedId !== transaction.id)
          dispatch(selectingTransactionById(transaction.id));
        handleShow('transactionDetail');
      }}>
      <Col xs={2} xl={1} className='p-0 d-flex align-items-center'>
        {imgRender(transaction.type)}
      </Col>
      <Col xs={5} xl={5} className='h-100 d-flex flex-column justify-content-center p-0'>
        <span className='fw-semibold'>{getCategoryInfo(transaction.type).name}</span>
        <span>{transaction.date}</span>
        <span className='text-secondary fst-italic'>{transaction.note}</span>
      </Col>
      <Col xs={5} xl={6} className='p-0 d-flex align-items-center justify-content-end flex-grow-1'>
        <span
          className={`${transactionColor(
            transaction.type,
            transaction.categoryId
          )}`}>{`${transactionNumberType(transaction.type, transaction.categoryId)}${convertDecimal(
          transaction.amount
        )} ${currency}`}</span>
      </Col>
    </Row>
  );
};

export default TransactionItem;
