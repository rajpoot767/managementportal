import AuthWrapper from "@/core/widgets/auth/AuthWrapper";
import SignInServerv2 from "@/core/widgets/auth/SignInServerv2";


export default async function Page({ params, searchParams }: { params: Promise<{ countryCode: string }>, searchParams: Promise<{ [key: string]: string }> }) {

    const countryCode = (await params).countryCode;
    const resolvedSearchParams = await searchParams;
    const returnUrl = resolvedSearchParams.returnUrl;
    return (
        <div className="">
            <AuthWrapper>
                <SignInServerv2 returnUrl={returnUrl} countryCode={countryCode} />
            </AuthWrapper>
        </div>
    );
}
