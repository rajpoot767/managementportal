import React, { ChangeEventHandler, ChangeEvent, WheelEvent } from "react";




const OtpInput: React.FC<InputControlProps> = (props) => {

    const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        if (props.callback !== undefined) {
            props.callback(props.name, text, props.index);
        }
    };
    const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    let value = "";
    if (props.value !== undefined && props.value !== null) {
        value = props.value;
    }
    const autoFocus = props?.attributes?.autoFocus || false;
    return (
        <React.Fragment>
            <label className="block mb-1">
                <span className="text-sm font-medium text-body-50">{props?.attributes?.label}</span>
                <input type="text"
                    name={props.name}
                    id={props.name}
                    value={value}
                    onChange={textChangeHandler}
                    autoComplete="off"

                    required={props?.attributes?.required}
                    placeholder={props?.attributes?.placeholder}
                    maxLength={4}
                    pattern={props?.attributes?.pattern}
                    disabled={props?.attributes?.readOnly}
                    minLength={props?.attributes?.minLength}
                    autoFocus={autoFocus}
                    onWheel={handleWheel}
                    className="peer mt-1 py-1.5 block w-full rounded border-body-300 shadow-sm tracking-[1.25em] text-center
                     focus:border-primary-300 focus:ring focus:ring-primary-700 focus:ring-opacity-50 transition-all duration-500 ease-in-out"/>

                <p className="hidden group-[.validated]:peer-invalid:block  mt-1  text-alert text-sm">
                    {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
                </p>
            </label>
        </React.Fragment>
    )
}

export default OtpInput;
