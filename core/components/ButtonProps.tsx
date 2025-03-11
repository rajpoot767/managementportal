import { ButtonTypes } from "./ButtonTypes";

export interface ButtonProps<T> {
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
