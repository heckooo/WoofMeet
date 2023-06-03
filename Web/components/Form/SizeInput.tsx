import { Field } from 'formik';
import React from 'react';

export const SizeInput: React.FC<{}> = ({ }) => {
  return (
    <div className="flex items-center my-4 justify-center">
      <Field component="select" id="size" name="size" className="form_input text-2xl my-4" required>
        <option value="" selected disabled hidden>Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </Field>
    </div>
  );
}