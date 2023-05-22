import React from 'react';
import { Field, FieldHookConfig, useField } from "formik";


type InputFieldProps = FieldHookConfig<HTMLInputElement> & {
  name: string;
  placeholder: string;
  type?: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, {error}] = useField(props);
  return (
    <div className="my-2 w-[300px] flex justify-center flex-col">
      <Field id={props.name} name={props.name} placeholder={props.placeholder} type={props.type} className="p-2" />
      {error ? <h1 className="text-[#d00]">{error}</h1> : null}
    </div>
  );
}