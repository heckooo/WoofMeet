import React from 'react';
import { Field } from 'formik';

import "./styles.scss";

export const FormInputs: React.FC<{}> = ({ }) => {
  return (
    <div className="flex flex-col justify-center my-4 lg:flex-row">
      <Field required className="form_input" type="text" id="address" name="address" placeholder="Zip Code or Address" />
      <Field required className="form_input mt-4 lg:mt-0" type="text" 
        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => { e.currentTarget.type = "date" }}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.currentTarget.type = "text" }}
        name="dropOff" id="dropOff" placeholder="Drop Off" />
      <Field required className="form_input mt-4 lg:mt-0" type="text" 
        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => { e.currentTarget.type = "date" }}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.currentTarget.type = "text" }}
        name="pickUp" id="pickUp" placeholder="Pick Up" />
    </div>
  );
}