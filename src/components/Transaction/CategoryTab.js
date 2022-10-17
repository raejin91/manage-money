import React from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import * as img from '../../imgs';

export const CategoryTab = ({
  categoryName,
  category,
  setFieldValue,
  closeCategoryModal,
  values,
  setActive,
}) => {
  return (
    <Container className='d-flex flex-column'>
      {category.map((item, id) => (
        <Button
          style={{ cursor: 'pointer' }}
          key={id}
          variant={`${values.categoryId && values.categoryId === item.name ? 'success' : 'light'}`}
          className='my-2 text-start'
          value={item.id}
          onClick={() => {
            setFieldValue('categoryId', item.name);
            setFieldValue('type', categoryName);
            setActive(categoryName);
            closeCategoryModal();
          }}>
          <Image rounded src={img[item.img]} style={{ width: 32, height: 32 }} />
          &nbsp;
          {item.name}
        </Button>
      ))}
    </Container>
  );
};
