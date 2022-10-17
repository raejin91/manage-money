import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../features/userSlice';
import { Image } from 'react-bootstrap';
import { BrandImg } from '../../../imgs';
import convertDecimal from '../../../hooks/convertDecimal';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector(state => state.user.userInfo);
  const { currencyList } = useSelector(state => state.wallet);
  const { balance, name, currency } = useSelector(state => state.wallet.walletInfo);
  return (
    <Navbar
      id='navbarContainer'
      expand='md'
      bg='dark'
      variant='dark'
      className='border-bottom border-secondary'>
      <Container fluid className='d-flex'>
        <Navbar.Brand as={NavLink} to='/' className='active'>
          <Image rounded src={BrandImg} style={{ width: 32, height: 32 }} />
          &nbsp; MoneyManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarHeader' />
        {username && (
          <Navbar.Collapse id='navbarHeader' className='w-100 d-flex'>
            <Nav className='w-50 d-flex flex-column ps-md-5'>
              {name && <span className='text-light fw-bold'>{name}</span>}
              {name && (
                <span className='text-info'>{`${convertDecimal(balance)} ${
                  currencyList.filter(cur => cur[0] === currency)[0][1]
                }`}</span>
              )}
            </Nav>
            <Nav className='w-50 d-flex align-items-center justify-content-end'>
              <span className='text-light'>{username}, </span>
              <Nav.Link
                as={Link}
                onClick={e => {
                  e.preventDefault();
                  dispatch(signOut());
                  setTimeout(() => {
                    navigate('/sign-in');
                  }, 500);
                }}>
                Sign out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
