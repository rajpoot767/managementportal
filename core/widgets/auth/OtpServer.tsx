import AuthService from "../../clients/AuthService";
import OtpClient from "./OtpClient";


interface OtpServerProps {
  transactionIdentifier: string;
  returnUrl?:string
}
const OtpServer: React.FC<OtpServerProps> = async (props) => {
  const transactionIdentifier = props.transactionIdentifier
  let request: VerifyOTPTransactionRequest = { transactionIdentifier: props.transactionIdentifier }
  let response = await new AuthService().verifyOTPTransaction(request);

  return (
    <OtpClient transactionIdentifier={transactionIdentifier} verifyOtpTransaction={response.result!} returnUrl={props.returnUrl} />
  );
}
export default OtpServer