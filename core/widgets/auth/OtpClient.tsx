"use client"
import Link from "next/link";
import ResendOtp from "./ResendOtp";
import InputControl from "../../controls/edit/InputControl";

import AuthService from "../../clients/AuthService";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { Hyperlink } from "@/core/components/HyperLink";
import { ButtonTypes } from "@/core/components/ButtonTypes";
import ClientButton from "@/core/components/ClientButton";
import { InputControlType } from "@/core/controls/edit/InputControlType";

interface OtpClientProps {
  transactionIdentifier: string;
  verifyOtpTransaction: VerifyOTPTransactionResult;
  returnUrl?: string;
}
const OtpClient: React.FC<OtpClientProps> = (props) => {
  const transactionIdentifier = props.transactionIdentifier
  const verifyOtpTransaction = props.verifyOtpTransaction
  const [otp, setOtp] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);


  const handleOtpChange = useCallback(
    (name: any, value: any, identifier: any) => {
      setOtp(value);

    },
    [otp]
  );

  const onSelfLogin = useCallback(async () => {

    let request: LoginByOtpRequest = {
      transactionIdentifier: transactionIdentifier,
      smsOtp: otp,
    }

    let response = await new AuthService().loginBySmsOtp(request);

    if (response && response.result && response.isSuccessful) {

      let session: Session = {
        contactId: response.result.contactId,
        fullName: response.result.fullName,
        truncatedIdentityNo: response.result.truncatedIdentityNo,
        oAuthToken: response.result.oAuthToken,
        refreshToken: response.result.refreshToken,
        isPrimaryContact: response.result.isPrimaryContact
      }

      await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session: session }),
      });

      window.location.href = props.returnUrl || "/dashboard/templates"

    }

    return response
  }, [otp, props]);



  const onValidate = async () => {
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.classList.add("validated");
      return false;
    } else {
      return true;
    }
  };



  return (
    <div className="h-full">
      <div className="py-8 px-5 rounded-3xl text-center border border-gray-900 shadow bg-gray-900">
        <div className="mx-auto w-full max-w-sm flex flex-col items-center">
          <h1 className="text-center text-lg font-semibold text-body-50">
            Enter your OTP
          </h1>
          <div className="flex flex-col gap-1 mt-2 text-sm lg:text-base items-center">
            <div className="text-body-300 mt-1 whitespace-normal md:whitespace-nowrap">
              We have just sent it on: {verifyOtpTransaction.identityNo}
            </div>
            <div className="whitespace-normal md:whitespace-nowrap">
              <Hyperlink href={"/auth/signin/" + verifyOtpTransaction.countryCode} className="text-body-300 hover:text-primary-300">Change</Hyperlink>
            </div>
          </div>
        </div>
        <div className="mt-8 mx-auto w-full max-w-sm">
          <form className="group space-y-6" noValidate ref={formRef}>
            <div className="flex flex-col text-start gap-4">
              <InputControl
                callback={handleOtpChange}
                name="phone"
                prefix="+91"
                value={otp}
                controlType={InputControlType.otpInput}
                attributes={{
                  label: "Enter your OTP",
                  required: true,
                  autoFocus: true,
                  errorMessage: "Please provide a valid OTP.",

                }}
              />



            </div>
            <div className="">
              <Button
                onValidate={onValidate}
                onClick={onSelfLogin}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </form>
          <div className="mt-5 text-white">
            <ResendOtp transactionIdentifier={transactionIdentifier} />
          </div>
          <div className="mt-6 text-start text-sm"></div>
          <div className="mt-8 text-sm text-body-400 text-start">
            By continuing, you consent to the&nbsp;
            <Hyperlink className="inline-block underline hover:text-body-100 transition-all duration-500 ease-in-out" href="https://styxsports.com/terms-and-conditions">
              Terms of Service
            </Hyperlink>
            &nbsp;and&nbsp;
            <Hyperlink className="inline-block underline hover:text-body-100 transition-all duration-500 ease-in-out" href="https://styxsports.com/privacy-policy">
              Privacy Policy
            </Hyperlink>
          </div>
        </div>
      </div >
    </div >
  );
}
export default OtpClient