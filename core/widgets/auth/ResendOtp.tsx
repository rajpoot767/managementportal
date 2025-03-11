"use client";
import React, { useEffect, useCallback, useState } from "react";
import Button from "@/core/components/Button";

import AuthService from "../../clients/AuthService";
import { ButtonTypes } from "../../components/ButtonTypes";

const ResendOtp = (props: { transactionIdentifier: string }) => {
  const transactionIdentifier = props.transactionIdentifier
  const [secs, setSeconds] = useState(60);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        clearInterval(sampleInterval);
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  const resendOTP = useCallback(async () => {
    let request = { transactionIdentifier: transactionIdentifier }
    let response = await new AuthService().resendSmsOtpForLogin(request);
    setSeconds(60);
    return response;
  }, [transactionIdentifier]);

  return (
    <div className="">
      {secs > 0 && (
        <div className="text-sm">
          Resend code in{" "}
          <span className="text-body-400">

            {secs}
            {"s"}
          </span>
        </div>
      )}

      {secs <= 0 && (
        <div className="">
          <Button ButtonType={ButtonTypes.Link}
            onClick={resendOTP}
            oneTimeAction={true}
          >Resend OTP</Button>
        </div>
      )}
    </div>
  );
};

export default ResendOtp;
