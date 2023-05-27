import React, { SyntheticEvent } from 'react';

import "./styles.scss";

export const FormInputs: React.FC<{}> = ({ }) => {
  return (
    <div className="flex flex-col justify-center my-4 lg:flex-row">
      <input required className="form_input" type="text" name="address" placeholder="Zip Code or Address" />
      <input required className="form_input mt-4 lg:mt-0" type="text" 
        onFocus={(e) => { e.currentTarget.type = "date" }}
        onBlur={(e) => { e.currentTarget.type = "text" }}
        name="dropOff" placeholder="Pick Up" />
      <input required className="form_input mt-4 lg:mt-0" type="text" 
        onFocus={(e) => { e.currentTarget.type = "date" }}
        onBlur={(e) => { e.currentTarget.type = "text" }}
        name="dropOff" placeholder="Drop Off" />
    </div>
  );
}