interface CountryLoginMethodData {
    countryLoginMethodId: number;
    countryCode?: string | null;
    loginMethodCode?: string | null;
    isRecommended: boolean;
  }
  interface SendOtpForLoginRequest {
    identityNo: string;
    identityTypeCode: string | null | undefined;
    countryCode: string;
  }
  interface SendOtpForLoginResult {
    transactionIdentifier: string;
    isUserExists: boolean;
    truncatedIdentityNo: string;
  }
  interface VerifyOTPTransactionRequest {
    transactionIdentifier: string;
  }
  interface VerifyOTPTransactionResult {
    transactionIdentifier: string;
    identityNo: string;
    identityTypeCode: string;
    countryCode: string;
    isValid: boolean;
  }
  interface ResendSmsOtpForLoginRequest {
    transactionIdentifier: string;
  }
  interface ResendSmsOtpForLoginResult {
    transactionIdentifier: string;
  }
  interface SelfRegisterByOtpRequest {
    transactionIdentifier: string;
    smsOtp: string;
    partyName: string;
    fullName: string;
  }
  interface SelfRegisterByOtpResult {
    contactId: number;
    fullName?: string | null;
    truncatedIdentityNo?: string | null;
    oAuthToken?: string | null;
    refreshToken?: string | null;
    isPrimaryContact: boolean;
  }
  interface LoginByOtpRequest {
    transactionIdentifier: string;
    smsOtp: string;
  }
  interface LoginByOtpResult {
    contactId: number;
    fullName?: string ;
    truncatedIdentityNo?: string;
    oAuthToken?: string ;
    refreshToken?: string ;
    isPrimaryContact: boolean;
  }
  
  interface ExtendOpenAccessRequest{
    transactionIdentifier:string
  }
  
  interface ExtendOpenAccessResult{
    contactId: number;
    fullName?: string ;
    truncatedIdentityNo?: string;
    oAuthToken?: string ;
    refreshToken?: string ;
    isPrimaryContact: boolean;
  }