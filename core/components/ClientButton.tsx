"use client";
import React from "react";
// import ToastService from './ToastService';
import { ButtonTypes } from "./ButtonTypes";
interface ClientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  ButtonType?: ButtonTypes;
  className?: string;
}
const buttonClasses: Map<ButtonTypes, string> = new Map([
  [ButtonTypes.Primary, `
      w-full relative inline-flex items-center justify-center rounded bg-primary px-4 py-3 lg:py-2 font-medium leading-6 text-white shadow-sm hover:bg-primary-800 hover:shadow-lg active:scale-95 active:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out
      `],

  [ButtonTypes.Hollow, `
      w-full inline-flex items-center justify-center rounded bg-transparent px-4 py-2 border border-primary text-sm font-medium ring-1 ring-primary ring-inset hover:bg-primary hover:text-white hover:shadow-md focus:outline-none focus:ring-1 focus:ring-primary active:scale-95 active:ring-1 active:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out
      `],

  [ButtonTypes.Link, " relative inline-flex text-body-100 items-center hover:text-primary-300 focus:text-primary-800  hover:underline-offset-2 active:scale-95 focus:outline-none transition duration-500 ease-in-out"],
]);

const ClientButton: React.FC<ClientButtonProps> = (props) => {
  const execute = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (props.onClick !== undefined) {
      let response = props.onClick();
    } else {
      //ToastService.showError("No action defined.");
    }
  };

  let buttonClass = props.ButtonType
    ? buttonClasses.get(props.ButtonType)
    : buttonClasses.get(ButtonTypes.Primary);

  return (
    <React.Fragment>
      <button
        type="submit"
        onClick={execute}
        className={buttonClass + " " + props.className}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default ClientButton;
