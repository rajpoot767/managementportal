'use client'
import React, { useState } from "react";
import ToastService from "./ToastService";

const Toast = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  ToastService.showError = function (message: string) {
    setShowToast(true);
    setMessage(message);
    setMessageType("error");
  };

  ToastService.showInfo = function (message: string) {
    setShowToast(true);
    setMessage(message);
    setMessageType("info");

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  ToastService.close = function () {
    setShowToast(false);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <>

      {showToast && <div className="fixed top-3 flex  justify-center z-50 w-10/12 lg:w-1/3 left-1/2 -translate-x-1/2" style={{  }}>
        <div className={"w-full items-center flex justify-between p-3 rounded-md " + (messageType=="error"?"bg-alert-100":"bg-success-100 ")}>
          <span className="font-medium text-body-950 text-sm">{message}</span>
          <button className="ml-2 focus:outline-none" onClick={closeToast}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>}
      
    </>
  );
};

export default Toast;
