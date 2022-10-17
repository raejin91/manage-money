import { Field } from 'formik';
import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const SelectElement = ({ data, label, name }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <FloatingLabel label={label}>
            <Form.Select
              size='mb'
              {...field}
              isValid={form.touched[field.name] && isValid}
              isInvalid={isInvalid}>
              <option value=''>Choose a currency</option>
              {data.map((item, index) => (
                <option key={index} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        );
      }}
    </Field>
  );
};

export default SelectElement;
