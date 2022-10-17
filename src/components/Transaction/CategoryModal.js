import { useState } from 'react';
import { Col, Modal, Row, Tab, Nav } from 'react-bootstrap';
import { CategoryTab } from './CategoryTab';
import './transaction.css';

const CategoryModal = ({ show, handleClose, categories, setFieldValue, values }) => {
  const [active, setActive] = useState('income');
  return (
    <Modal
      onHide={handleClose}
      show={show}
      className='categoryModal'
      dialogClassName='categoryModalDiaglog h-75 overflow-hidden'
      backdropClassName='categoryBackdrop'
      contentClassName='h-100 d-flex flex-column'>
      <Modal.Header className='fw-bold fs-4' closeButton style={{ height: '10%' }}>
        Category
      </Modal.Header>
      <Modal.Body style={{ height: '90%' }}>
        <Row style={{ height: '10%' }}>Search</Row>
        <Row style={{ height: '90%' }} className='overflow-hidden'>
          <Col sm={12} className='h-100'>
            <Tab.Container id='categoryTabs' defaultActiveKey={active}>
              <Nav
                variant='tabs'
                style={{ height: '8%' }}
                className='d-flex justify-content-center'>
                {Object.keys(categories).map((key, index) => (
                  <Nav.Item
                    key={index}
                    style={{ width: 'calc(100%/3)' }}
                    className='text-center text-capitalize'>
                    <Nav.Link eventKey={key}>{key}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content style={{ height: '92%' }} className='overflow-auto'>
                {Object.keys(categories).map((key, index) => (
                  <Tab.Pane key={index} eventKey={key}>
                    <CategoryTab
                      categoryName={key}
                      setActive={setActive}
                      values={values}
                      category={categories[key]}
                      setFieldValue={setFieldValue}
                      closeCategoryModal={handleClose}
                    />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
