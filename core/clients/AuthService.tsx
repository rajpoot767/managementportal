// Generated TypeScript code from OpenAPI Specification

import ServiceClient from "./ServiceClient";

class AuthService {
  baseUrl: string;
  session?: Session;
  constructor(session?: Session) {
    // this.baseUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL || "";//"https://prodapigatewaystyxsports.azurewebsites.net";
    this.baseUrl = "http://localhost:5000"
    this.session = session;
  }

  async getCountryLoginMethods(countryCode: string): Promise<QueryResponse<CountryLoginMethodData>> {
    const pathParams: { [key: string]: any } = {};
    pathParams["countryCode"] = countryCode;
    const client = new ServiceClient(this.baseUrl, this.session);

    return await client.get("/authv2/api/Auth/getCountryLoginMethods/{countryCode}", pathParams);
  }

  async sendOtpForLogin(request: SendOtpForLoginRequest): Promise<ActionResponse<SendOtpForLoginResult>> {
    console.log(request)
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/auth/sendOtpForLogin", request);
  }
  async verifyOTPTransaction(request: VerifyOTPTransactionRequest): Promise<ActionResponse<VerifyOTPTransactionResult>> {
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/Auth/verifyOTPTransaction", request);
  }
  async resendSmsOtpForLogin(request: ResendSmsOtpForLoginRequest): Promise<ActionResponse<ResendSmsOtpForLoginResult>> {
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/Auth/resendOtpForLogin", request);
  }
  async selfRegisterOtp(request: SelfRegisterByOtpRequest): Promise<ActionResponse<SelfRegisterByOtpResult>> {
    console.log(request)
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/Auth/selfRegisterByOtp", request);
  }
  async loginBySmsOtp(request: LoginByOtpRequest): Promise<ActionResponse<LoginByOtpResult>> {
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/Auth/loginByOtp", request);
  }

  async extendOpenAccess(request: ExtendOpenAccessRequest): Promise<ActionResponse<ExtendOpenAccessResult>> {
    console.log(request)
    let client = new ServiceClient(this.baseUrl, this.session);
    return await client.post("/authv2/api/Auth/extendOpenAccess", request);
  }

}
export default AuthService;
