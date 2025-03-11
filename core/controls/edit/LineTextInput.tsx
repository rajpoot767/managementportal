import { ChangeEvent } from "react";

const LineTextInput: React.FC<InputControlProps> = (props) => {

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

    return <label>
        <span className="text-sm font-medium text-body-700">
            {props?.attributes?.label}
        </span>
        <input
            type="text"
            name={props.name}
            id={props.name}
            value={value}
            autoFocus={autoFocus}
            onChange={textChangeHandler}
            required={props?.attributes?.required}
            placeholder={props?.attributes?.placeholder}
            maxLength={props?.attributes?.maxLength}
            disabled={props?.attributes?.readOnly}
            minLength={props?.attributes?.minLength}
            // className="w-full px-4 py-2 border border-gray-400 rounded-sm shadow-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-100 ease-in-out hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed"
            className={`peer mt-1 py-1.5 block w-full rounded border-body-300 shadow-sm
                     focus:border-primary-300 focus:ring focus:ring-primary-700 focus:ring-opacity-50 transition-all duration-500 ease-in-out tracking-widest disabled:bg-gray-100  ${props.className}`}
        />
        <p className="text-start hidden group-[.validated]:peer-invalid:block mt-1 text-alert text-sm">
            {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
        </p>
    </label>
}
export default LineTextInput