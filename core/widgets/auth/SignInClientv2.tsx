"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import InputControl from "../../controls/edit/InputControl";
import { Hyperlink } from "../../components/HyperLink";
import AuthService from "../../clients/AuthService";
// import { MdInsertComment } from "react-icons/md";

import RouteBuilder from "../../utilities/RouteBuilder";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import ClientButton from "../../components/ClientButton";
import { ButtonTypes } from "../../components/ButtonTypes";
import { CountryCodes } from "@/core/datasets/CountryCodes";
import LocationServiceClient from "@/core/clients/LocationServiceClient";
import { InputControlType } from "@/core/controls/edit/InputControlType";

interface SignInProps {
    countryCode?: string;

    returnUrl: string
}

const SignInClientv2: React.FC<SignInProps> = (props) => {

    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const [countryCode, setCountryCode] = useState<string>("")
    const dataset = CountryCodes
    const countryName = dataset.find((item) => item.CountryCode === countryCode)?.CountryName
    const prefixValue = dataset.find((item) => item.CountryCode === countryCode)?.CountryDialingCode ?? "...";
    const [changeCountry, setChangeCountry] = useState<boolean>(false)
    const [identityTypeCode, setIdentityTypeCode] = useState<string | undefined | null>("");
    const [identityNo, setIdentityNo] = useState<any>("");

    useEffect(() => {
        async function getCountryCode() {
            if (props.countryCode) {
                setCountryCode(props.countryCode);
            }
            else {
                let serviceClient = new LocationServiceClient();
                const result = await serviceClient.get<CountryInfo>("/v1/ip/country.json");
                console.log("Hello")
                if (result) {
                    console.log(result)
                    setCountryCode(result.country_3)
                } else {
                    setChangeCountry(true)
                }
            }

        }
        getCountryCode();
    }, [props]);

    const handleCountryInputChange = useCallback(
        (name: any, value: any, identifier: any) => {
            setCountryCode(value);
        },
        []
    );

    const handleInputChange = useCallback(
        (name: any, value: any, identifier: any) => {
            setIdentityNo(value);

        },
        []
    );

    const onValidate = async () => {
        if (formRef.current) {
            const isValid = formRef.current.checkValidity();
            if (!isValid) {
                formRef.current.classList.add("validated");
            }
            return isValid;
        }
        return false;
    };


    const handleChangeCountry = useCallback(async () => {
        setChangeCountry(true)

    }, []);

    const sendOtp = useCallback(async () => {
        let request: SendOtpForLoginRequest = {
            identityNo: identityNo,
            identityTypeCode: "-",
            countryCode: countryCode,
        };
        let response = await new AuthService().sendOtpForLogin(request);
        console.log(response)
        if (response.isSuccessful) {
            if (response.result?.isUserExists) {
                router.push(RouteBuilder.createPasswordLink(response!.result!.transactionIdentifier, props.returnUrl));
            }
            else {
                router.push(RouteBuilder.createRegisterByInvitePasswordLink(response!.result!.transactionIdentifier, props.returnUrl));
            }
        }
        return response;
    }, [props, identityNo]);
    console.log(countryCode)
    return (
        <div className="h-full">
            <div className="py-8 px-5 rounded-3xl text-center border border-gray-900 shadow bg-gray-900">
                <div className="mx-auto w-full max-w-sm flex flex-col items-center">
                    <h1 className="text-center text-lg font-semibold text-body-50">
                        Sign in
                    </h1>
                    <h6 className="text-center text-body-100 mt-1">to your account</h6>
                </div>

                <div className="mt-6 lg:mt-8 mx-auto w-full max-w-sm">
                    <div className="mb-6">
                        <div className={`${changeCountry ? "hidden" : "flex"} gap-5 text-sm lg:text-base text-body-300`}>
                            <div className="flex gap-1">
                                <h3>Country:</h3>
                                <h3>{countryName} ({prefixValue})</h3>
                            </div>
                            <div>
                                <ClientButton ButtonType={ButtonTypes.Link} className="underline text-body-300" onClick={handleChangeCountry} >Change</ClientButton>
                            </div>
                        </div>
                        {changeCountry && <div className="flex-1 " >
                            <InputControl

                                name="countryCode"
                                controlType={InputControlType.select}
                                value={countryCode}
                                callback={handleCountryInputChange}
                                dataset={CountryCodes}
                                dataKeyFieldName="CountryCode"
                                dataTextFieldName="CountryName"
                                attributes={{
                                    autoFocus: true,
                                    required: true,
                                    placeholder: "Select Country",
                                    errorMessage: "Please select your country.",
                                }}
                            />
                        </div>}
                    </div>

                    <form className="group space-y-6" noValidate ref={formRef}>
                        <div className="flex flex-col gap-2 text-start">
                            <InputControl
                                name="phone"
                                prefix={prefixValue}
                                value={identityNo}
                                controlType={InputControlType.lineTextInput}
                                callback={handleInputChange}

                                attributes={{
                                    autoFocus: true,
                                    label: "Whatsapp number or Email",
                                    required: true,
                                    errorMessage: "Please provide a valid number",
                                    placeholder: "",
                                }}
                            />


                        </div>
                        <div className=" pt-4">
                            <Button
                                ButtonType={ButtonTypes.Primary}
                                onValidate={onValidate}
                                onClick={sendOtp}
                                className="w-full"
                            >
                                Continue
                            </Button>
                            <p className="text-sm mt-4 text-start text-body-400">
                                An OTP will be sent on the above address
                            </p>
                        </div>

                    </form>

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
export default SignInClientv2;