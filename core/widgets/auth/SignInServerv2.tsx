import AuthService from "../../clients/AuthService";

import SignInClientv2 from "./SignInClientv2";


interface SignInServerProps {
  countryCode?: string;
  returnUrl: string
}

const SignInServerv2: React.FC<SignInServerProps> = async (props) => {

  return (
    <SignInClientv2 returnUrl={props.returnUrl} countryCode={props.countryCode} />
  );
};
export default SignInServerv2;
