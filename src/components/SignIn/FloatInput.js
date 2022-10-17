import FloatLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Field } from 'formik';

const FloatInput = ({ name, type, id, label, disabled, onClick }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <FloatLabel controlId={id} label={label} className='mb-3'>
            <Form.Control
              {...field}
              type={type}
              isValid={form.touched[field.name] && isValid}
              isInvalid={isInvalid}
              placeholder={label}
              disabled={disabled || false}
              className='mb-3'
              onClick={'' || onClick}
            />
            <Form.Control.Feedback type='invalid' className='px-3 py-1 fs-4'>
              {form.errors[field.name]}
            </Form.Control.Feedback>
          </FloatLabel>
        );
      }}
    </Field>
  );
};

export default FloatInput;
