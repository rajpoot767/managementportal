import AuthService from "../../clients/AuthService";
import RegisterClient from "./RegisterClient";


interface RegisterServerProps {
  transactionIdentifier: string;
  returnUrl?:string
}

const RegisterServer: React.FC<RegisterServerProps> = async (props) => {

  const transactionIdentifier = props.transactionIdentifier
  let request: VerifyOTPTransactionRequest = { transactionIdentifier: props.transactionIdentifier }
  let response = await new AuthService().verifyOTPTransaction(request);

  return <RegisterClient transactionIdentifier={transactionIdentifier} verifyOtpTransaction={response.result!} returnUrl={props.returnUrl} />

};
export default RegisterServer;
