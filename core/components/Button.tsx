'use client'
import React, { useState } from 'react';
import ToastService from './ToastService';
import { ButtonTypes } from './ButtonTypes';
import Confirm from './Confirm';
interface ButtonProps<T> {
    oneTimeAction?: boolean;
    onValidate?: () => Promise<boolean>;
    onClick?: () => Promise<ActionResponse<T>>;
    showToast?: boolean;
    children: React.ReactNode;
    ButtonType?: ButtonTypes,
    className?: string,
    hideProgressIndicator?: boolean
    confirm?: boolean,
    confirmationMessage?: string
}


const buttonClasses: Map<ButtonTypes, string> = new Map(
    [
        [ButtonTypes.Primary, "relative inline-flex items-center justify-center rounded bg-primary-700 hover:bg-primary-600 px-4 py-3 lg:py-2 font-medium leading-6 text-white shadow-sm hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary active:scale-95 active:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"],

        [ButtonTypes.Hollow, "inline-flex text-sm font-medium items-center justify-center px-4 py-2 border border-primary rounded bg-transparent ring-1 ring-primary ring-inset hover:bg-primary hover:text-white hover:shadow-md hover:ring-1 hover:ring-primary focus:outline-none focus:ring-1 focus:ring-primary active:ring-1 active:ring-primary transition duration-150 ease-in-out m-1 active:scale-95"],

        [ButtonTypes.Link, " relative inline-flex text-primary-50 scale-90 items-center hover:text-primary-400 focus:text-primary-800 hover:underline-offset-2 active:scale-95 focus:outline-none transition duration-150 ease-in-out"],
    
        [ButtonTypes.Delete, "relative inline-flex items-center justify-center rounded bg-alternate-700 px-4 py-3 lg:py-2 font-medium leading-6 text-white shadow-sm hover:bg-alternate-600 hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-alternate-600 active:scale-95 active:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"],
    
    ]
);

{/* <a href="#" class="relative inline-flex text-primary items-center hover:text-primary-dark focus:text-primary-dark hover:underline active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150 ease-in-out">Your Link</a> */ }


const progressClasses: Map<ButtonTypes, string> = new Map(
    [
        [ButtonTypes.Primary, "text-white"],

        [ButtonTypes.Hollow, "text-primary-500"],
    ]
);

const Button: React.FC<ButtonProps<any>> = (props) => {
    const [inProgress, setInProgress] = useState(false);
    const [isActionPerformed, setIsActionPerformed] = useState(false);
    const [responseMessage, setResponseMessage] = useState<any>(null);
    const [showModal, setShowModal] = useState<React.ReactNode | null>(null);
    const execute = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (props.confirm) {
            const confirmed = await showConfirmation('Are you sure you want to delete this item?');
            setShowModal(null);
            if (!confirmed) {
                return;
            }
        }

        if (props.oneTimeAction && isActionPerformed) {
            return;
        }
        setInProgress(true);
        let isValid = true;
        if (props.onValidate !== undefined) {
            isValid = await props.onValidate();
            if (!isValid) {
                setInProgress(false);
                ToastService.showError("There are errors in the form. Please fix them before proceeding.");
                return;
            }
        }

        if (props.onClick !== undefined) {
            let response = await props.onClick();
            //console.log(response);
            if (response.isSuccessful) {
                setIsActionPerformed(true);
                setResponseMessage(response.message);
                if (props.showToast) {
                    ToastService.showInfo(response.message || "");
                }
                if (!response.keepRunningIndicator) {
                    setInProgress(false);
                }

            }
            else {
                ToastService.showError(response.message || "");
                setInProgress(false);
            }
        }
        else {
            ToastService.showError("No action defined.");
            setInProgress(false);
        }


    }

    const showConfirmation = (message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const onConfirm = () => resolve(true);
            const onCancel = () => resolve(false);
            setShowModal(<Confirm message={props.confirmationMessage} onConfirm={onConfirm} onCancel={onCancel} />);
        });
    };


    let buttonClass = props.ButtonType ? buttonClasses.get(props.ButtonType) : buttonClasses.get(ButtonTypes.Primary);
    let progressClass = props.ButtonType ? progressClasses.get(props.ButtonType) : progressClasses.get(ButtonTypes.Primary);


    const isDisabled = inProgress || (isActionPerformed && props.oneTimeAction);

    return (
        <React.Fragment>
            <button type="submit"
                onClick={execute}
                disabled={isDisabled}
                title={isDisabled ? "The button is disabled to prevent any action" : ""}
                className={`${buttonClass} relative ${props.className}`}>

                {isActionPerformed && props.oneTimeAction && responseMessage ? responseMessage : props.children}

                {inProgress && <React.Fragment>
                    {props.hideProgressIndicator === true ? <div className="absolute bottom-0 left-0 h-0.5 bg-gray-400 rounded animate-progress"></div> :
                        <svg className={"animate-spin ml-2 mr-3 h-5 w-5 " + progressClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                </React.Fragment>}
            </button>
            {showModal}
        </React.Fragment >
    );
}


export default Button;
