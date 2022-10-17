import { Container } from 'react-bootstrap';
import TransactionItem from './TransactionItem';
import './transaction.css';

const TransactionList = ({ transactionList, currency, handleShow }) => {
  return (
    <Container className='p-0 overflow-auto' id='transactionList'>
      {transactionList.map(item => (
        <TransactionItem
          currency={currency}
          transaction={item}
          key={item.id}
          handleShow={handleShow}
        />
      ))}
    </Container>
  );
};

export default TransactionList;
