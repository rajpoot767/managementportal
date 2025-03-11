'use client'
import React, { useState } from "react";
import ClientButton from "./ClientButton";
import { ButtonTypes } from "./ButtonTypes";

interface ConfirmProps {
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
const Confirm: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel }) => {
    const [showModal, setShowModal] = useState(true);

    const handleConfirmAction = () => {
        setShowModal(false);
        if (onConfirm) {
            onConfirm();
        }
    };

    const handleCancelAction = () => {
        setShowModal(false);
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                    <div className="bg-white rounded-md p-6 w-2/6 shadow border z-50">
                        <p className="text-xl font-medium mb-4">Confirmation</p>
                        <p className="mb-4">{message}</p>
                        <div className="flex justify-end gap-8">
                            <ClientButton onClick={handleCancelAction} ButtonType={ButtonTypes.Hollow}
                            >Cancel</ClientButton>
                            <ClientButton onClick={handleConfirmAction}
                            >Confirm</ClientButton>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Confirm;



{/* <div className="modal-content">
                        <p>{message}</p>
                        <button onClick={handleConfirmAction}>Confirm</button>
                        <button onClick={handleCancelAction}>Cancel</button>
                    </div> */}