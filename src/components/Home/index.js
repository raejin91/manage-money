import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWalletByUserId } from '../../features/walletSlice';
import MainLayout from '../layouts/Main';

const Home = () => {
  const { id: userId, username } = useSelector(state => state.user.userInfo);
  const { id: walletId } = useSelector(state => state.wallet.walletInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate('/sign-in');
    else {
      dispatch(getWalletByUserId(userId));
      if (!walletId) navigate('/my-wallet');
    }
  }, [username, navigate, userId, dispatch, walletId]);

  return (
    <MainLayout>
      <Container>
        {username && <h2>Welcome, {username}</h2>}
        <h2 className='fw-bold'>Simple way to manage personal finances</h2>
      </Container>
    </MainLayout>
  );
};

export default Home;
