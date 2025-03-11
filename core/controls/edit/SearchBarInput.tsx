import { ChangeEvent } from "react";


const SearchBarInput: React.FC<InputControlProps> = (props) => {

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


    return <label>
        <div className="grid grid-cols-1 items-center">

            <div className="row-start-1 col-start-1 z-10 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#39476B" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11 2a9 9 0 105.618 16.032l3.675 3.675a1 1 0 001.414-1.414l-3.675-3.675A9 9 0 0011 2zm-7 9a7 7 0 1114 0 7 7 0 01-14 0z" fill="#39476B"></path></svg>
            </div>
            <div className="row-start-1 col-start-1">
                <input
                    type="text"
                    name={props.name}
                    id={props.name}
                    value={value}
                    onChange={textChangeHandler}
                    placeholder={props?.attributes?.placeholder}
                    maxLength={props?.attributes?.maxLength}
                    disabled={props?.attributes?.readOnly}
                    minLength={props?.attributes?.minLength}
                    className="w-full pl-7 border-neutral-300 transition-all duration-500 ease-in-out rounded"
                />
                <p className="text-start hidden group-[.validated]:peer-invalid:block mt-1 text-alert text-sm">
                    {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
                </p>
            </div>
        </div>
    </label>
}
export default SearchBarInput
