"use client";
import React, { ChangeEventHandler, ChangeEvent } from "react";



// React.FC<ButtonProps<any>>

const PhoneInput: React.FC<InputControlProps> = (props) => {

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;


    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(text)) {
      event.target.setCustomValidity("Please provide a valid phone number.");
    } else {
      event.target.setCustomValidity("");
    }

    // Callback to update parent component
    if (props.callback !== undefined) {
      props.callback(props.name, text, props.index);
    }
  };


  let value = "";
  if (props.value !== undefined && props.value !== null) {
    value = props.value;
  }

  const autoFocus = props?.attributes?.autoFocus || false;

  return (
    <React.Fragment>
      <label className="block mb-1 text-left">
        <span className="text-sm font-medium text-body-50">
          {props?.attributes?.label}
        </span>

        <div
          className="peer flex mt-1 items-center bg-body-200 rounded border border-body-300 
         focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-700 focus-within:ring-opacity-50 transition-all duration-500 ease-in-out
            "
        >
          <span className="px-3 text-body-700">{props.prefix}</span>

          <div className="bg-body-100 flex-1">
            <input
              type="tel"
              name={props.name}
              id={props.name}
              value={value}
              autoFocus={autoFocus}
              onChange={textChangeHandler}
              required={props?.attributes?.required}
              placeholder={props?.attributes?.placeholder}
              maxLength={props?.attributes?.maxLength}
              pattern={props?.attributes?.pattern}
              disabled={props?.attributes?.readOnly}
              minLength={props?.attributes?.minLength}
              className="peer py-3 lg:py-2 block w-full outline-none focus:ring-0 border-0 mr-0.5 tracking-widest"
            />

          </div>
          <p className="hidden group-[.validated]:peer-invalid:block mt-5 text-alert text-sm">
            {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
          </p>
        </div>
      </label>
    </React.Fragment>
  );
};

export default PhoneInput;


