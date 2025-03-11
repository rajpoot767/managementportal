import React, { ChangeEventHandler, ChangeEvent, WheelEvent } from "react";
const NumberInput: React.FC<InputControlProps> = (props) => {

    const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        if (props.callback !== undefined) {
            props.callback(props.name, text, props.index);
        }
    };

    let value = "";
    if (props.value !== undefined && props.value !== null) {
        value = props.value;
    }

    const autoFocus = props?.attributes?.autoFocus || false;



    const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
        event.preventDefault();
        // @ts-ignore
        event.target.blur();
    };




    return (
        <React.Fragment>
            <label className="block mb-1">

                <span className="text-sm font-medium ">{props?.attributes?.label}</span>
                <input type="number"
                    name={props.name}
                    id={props.name}
                    value={value}
                    onChange={textChangeHandler}
                    onWheel={handleWheel}
                    required={props?.attributes?.required}
                    placeholder={props?.attributes?.placeholder}
                    pattern={props?.attributes?.pattern}
                    disabled={props?.attributes?.readOnly}
                    max={props?.attributes?.maxValue}
                    //min={props?.attributes?.minValue}
                    className={`peer mt-1 py-1.5 block w-full rounded border-body-300 shadow-sm
                    focus:border-primary-300 focus:ring focus:ring-primary-700 focus:ring-opacity-50 transition-all duration-500 ease-in-out tracking-widest disabled:bg-gray-100  ${props.className}`} />
                <p className="hidden group-[.validated]:peer-invalid:block  mt-1  text-alert text-sm">
                    {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
                </p>
            </label>
        </React.Fragment>
    )
}

export default NumberInput;
