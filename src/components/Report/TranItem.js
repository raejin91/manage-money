import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

const TranItem = ({ transaction, currency }) => {
  const categories = useSelector(state => state.categories);

  const getCategoryInfo = type =>
    categories[type].filter(item => item.id === transaction.categoryId)[0];

  return (
    <Row className='mb-2'>
      <Col xs={8} className='d-flex flex-column'>
        <span>{getCategoryInfo(transaction.type).name}</span>
        <span className='text-secondary fst-italic'>{transaction.date}</span>
      </Col>
      <Col xs={4} className='d-flex align-items-center'>{`${transaction.amount} ${currency}`}</Col>
    </Row>
  );
};

export default TranItem;
