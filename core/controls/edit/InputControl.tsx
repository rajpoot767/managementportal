import React from "react";
import LineTextInput from "./LineTextInput";
import SelectBox from "./SelectBox";
import PhoneInput from "./PhoneInput";
import EmailInput from "./EmailInput";
import SearchBarInput from "./SearchBarInput";
import OtpInput from "./OtpInput";
import { InputControlType } from "./InputControlType";
import NumberInput from "./NumberInput";
import CheckboxInput from "./CheckboxInput";

const InputControl: React.FC<InputControlProps> = (props) => {
  const ControlComponents = {
    [InputControlType.lineTextInput]: LineTextInput,
    [InputControlType.select]: SelectBox,
    [InputControlType.phoneInput]: PhoneInput,
    [InputControlType.emailInput]: EmailInput,
    [InputControlType.otpInput]: OtpInput,
    [InputControlType.searchBarInput]: SearchBarInput,
    [InputControlType.numberInput]: NumberInput,
    [InputControlType.checkboxInput]: CheckboxInput,
  };
  const SelectedControlComponent = ControlComponents[props.controlType];

  return <React.Fragment>
    {SelectedControlComponent ? <SelectedControlComponent {...props} /> : "Control not found"}
  </React.Fragment>
}
export default InputControl