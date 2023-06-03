import React from 'react';
import HouseIcon from '@mui/icons-material/House';
import { Field } from 'formik';

export const Accomodation: React.FC<{}> = ({ }) => {
  return (
    <div className="flex justify-center my-4 text-2xl relative items-center w-[3/5]">
      <Field component="select" required id="accomodation" name="accomodation" className="form_input w-full my-4 text-center">
        <option value="House Sitting">House Sitting</option>
        <option value="Pet Hotel">Pet Hotel</option>
      </Field>
      <HouseIcon className="text-4xl text-[#FFB800] absolute left-4" />
    </div>
  );
}