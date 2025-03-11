import React, { ChangeEvent } from "react";

// React.FC<ButtonProps<any>>

const CheckboxInput: React.FC<InputControlProps> = (props) => {

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    let text = event.target.checked;
    console.log(text);
    if (props.callback !== undefined) {
        props.callback(props.name, text, props.index);
    }
  };

  // let value = "";
  // if (props.value !== undefined && props.value !== null) {
  //   value = props.value;
  // }
  const trueValue = true;
  let value = false;
  if (props.value != undefined && props.value != null && props.value != "" && (props.value == "true" || props.value.toString()=="true")) {
     value = true;
  }


  return (
    <React.Fragment>
      <label className="block mb-1">
        <span className="text-sm font-medium">{props?.attributes?.label}</span>
        <input type="checkbox"
          name={props.name}
          id={props.name}
          //value={value}
          checked={value}
          onChange={textChangeHandler}
          required={props?.attributes?.required}
          placeholder={props?.attributes?.placeholder}
          maxLength={props?.attributes?.maxLength}
          pattern={props?.attributes?.pattern}
          disabled={props?.attributes?.readOnly}
          minLength={props?.attributes?.minLength}
          className="peer mt-1 py-1.5 block rounded border-gray-300 shadow-sm
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     "/>

        <p className="hidden group-[.validated]:peer-invalid:block  mt-1  text-alert text-sm">
          {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
        </p>
      </label>
    </React.Fragment>
  )
}

export default CheckboxInput;
