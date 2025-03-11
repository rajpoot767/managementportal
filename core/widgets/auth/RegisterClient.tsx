"use client"
import Link from "next/link";
import InputControl from "../../controls/edit/InputControl";
import ResendOtp from "./ResendOtp";

import { Hyperlink } from "../../components/HyperLink";
import { HyperlinkTypes } from "../../components/HyperLinkTypes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../clients/AuthService";
import Button from "../../components/Button";
import { ButtonTypes } from "@/core/components/ButtonTypes";
import ClientButton from "@/core/components/ClientButton";
import { InputControlType } from "@/core/controls/edit/InputControlType";

interface RegisterClientProps {
  transactionIdentifier: any;
  verifyOtpTransaction: VerifyOTPTransactionResult;
  returnUrl?: string;
}

const RegisterClient: React.FC<RegisterClientProps> = (props) => {

  const verifyOtpTransaction = props.verifyOtpTransaction
  const transactionIdentifier = props.transactionIdentifier
  const [otp, setOtp] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showFreeAccess, setShowFreeAccess] = useState<boolean>(false)
  const [allowFreeAccess, setAllowFreeAccess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);





  const onSelfRegister = useCallback(async () => {

    let request: SelfRegisterByOtpRequest = {
      transactionIdentifier: transactionIdentifier,
      smsOtp: otp,
      partyName: "",
      fullName: name,
    }
    let response = await new AuthService().selfRegisterOtp(request);

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
      window.location.href = props.returnUrl || "/dashboard/templates";
    }
    return response
  }, [otp, name, props]);



  const handleOtpChange = useCallback(
    (name: any, value: any, identifier: any) => {
      setOtp(value);
    },
    [otp]
  );
  const handleFullNameChange = useCallback(
    (name: any, value: any, identifier: any) => {
      setName(value);
    },
    [name]
  );

  const onValidate = async () => {
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.classList.add("validated");
      return false;
    } else {
      return true;
    }
  };


  useEffect(() => {
    setTimeout(() => setShowFreeAccess(true), 10000)
  })




  const allowFreeAccessAction = useCallback(async () => {

    let request: ExtendOpenAccessRequest = {
      transactionIdentifier: transactionIdentifier,
    }
    let response = await new AuthService().extendOpenAccess(request);

    if (response && response.result && response.isSuccessful) {
      let session: Session = {
        contactId: response.result.contactId,
        fullName: response.result.fullName,
        truncatedIdentityNo: response.result.truncatedIdentityNo,
        oAuthToken: response.result.oAuthToken,
        refreshToken: response.result.refreshToken,
        isPrimaryContact: response.result.isPrimaryContact
      }
      await fetch("/api/extendopenaccess", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session: session }),
      });
      setAllowFreeAccess(true);
     
    }
    return response
  }, [otp, name, props]);

  const redirectUserToMainSite=()=>{
    window.location.href = props.returnUrl || "/dashboard/templates";
  }

  return (
    <div className="h-full">
      <div className="py-8 px-5 rounded-3xl text-center border border-gray-900 shadow bg-gray-900">
        <div className="mx-auto w-full max-w-sm flex flex-col items-center">
          <h1 className="text-center text-lg font-semibold text-body-50">
            New User Registration
          </h1>
          <div className="flex flex-col gap-1 mt-2 text-sm lg:text-base">
            <div className="text-body-300 mt-1 whitespace-normal md:whitespace-nowrap ">
              We have just sent it on: {verifyOtpTransaction.identityNo}
            </div>
            <div className="whitespace-normal md:whitespace-nowrap">
              <Hyperlink href={"/auth/signin/" + verifyOtpTransaction.countryCode} className="text-body-300 hover:text-primary-300">Change</Hyperlink>
            </div>
          </div>

        </div>
        <div className="mt-8 mx-auto w-full max-w-sm">
          {!allowFreeAccess && <form className="group space-y-6" noValidate ref={formRef}>
            <div className="flex flex-col gap-4">
              <div className="flex-1 text-start">
                <InputControl
                  name="otp"
                  callback={handleOtpChange}
                  value={otp}
                  controlType={InputControlType.otpInput}
                  attributes={{
                    autoFocus: true,
                    required: true,
                    label: "Enter your OTP",
                    errorMessage: "Please provide a valid OTP.",
                  }}
                />
                {showFreeAccess && <div className="text-body-100 text-center mt-1">
                  Didn't receive the OTP yet?{" "}
                  <Button className="underline hover:text-body-50" ButtonType={ButtonTypes.Link} 
                  onClick={allowFreeAccessAction}>Click here</Button>
                </div>}
              </div>


              <div className="flex-1 text-start">
                <InputControl
                  name="name"
                  value={name}
                  callback={handleFullNameChange}
                  controlType={InputControlType.lineTextInput}
                  attributes={{
                    required: true,
                    label: "Full Name",
                    placeholder: "First name and Last name",
                    errorMessage: "Please provide a valid Name.",
                  }}
                />

              </div>
            </div>
            <div className=" pt-4">
              <Button
                onValidate={onValidate}
                className="w-full"
                ButtonType={ButtonTypes.Primary}
                onClick={onSelfRegister}
              >
                Register
              </Button>
            </div>
            <div className="mb-2 mt-5 text-white">
              <ResendOtp transactionIdentifier={transactionIdentifier} />
            </div>
          </form>}
          {allowFreeAccess && <React.Fragment>
            <div className="text-body-100 text-center">
              You have been granted 48 hours of open access. Next time, please provide a valid WhatsApp number or email address to receive the OTP.
            </div>

            <div className="mt-6">
            <ClientButton
                className="w-full"
                ButtonType={ButtonTypes.Primary}
                onClick={redirectUserToMainSite}
              >
                Watch Live Now
              </ClientButton>

            </div>
          </React.Fragment>
          }



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
      </div>
    </div>
  );
};
export default RegisterClient;
