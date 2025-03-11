import AuthWrapper from "@/core/widgets/auth/AuthWrapper";
import OtpServer from "@/core/widgets/auth/OtpServer";

export default async function Page({ params,searchParams }: { params: Promise<{ transactionIdentifier: string }>,searchParams: Promise<{ [key: string]: string }>  }) {


  const resolvedSearchParams = await searchParams;
  const returnUrl = resolvedSearchParams.returnUrl;

  const transactionIdentifier = (await params).transactionIdentifier;


  return (
    <div className="">
      <AuthWrapper>
        <OtpServer transactionIdentifier={transactionIdentifier} returnUrl={returnUrl} />
      </AuthWrapper>
    </div>
  );
}
