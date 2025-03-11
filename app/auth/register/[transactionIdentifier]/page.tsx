import AuthWrapper from "@/core/widgets/auth/AuthWrapper";
import RegisterServer from "@/core/widgets/auth/RegisterServer";

export default async function Page({ params,searchParams }: { params: Promise<{ transactionIdentifier: string }>,searchParams: Promise<{ [key: string]: string }> }) {

  const resolvedSearchParams = await searchParams;
  const returnUrl = resolvedSearchParams.returnUrl;

  const transactionIdentifier = (await params).transactionIdentifier;
  return (
    <AuthWrapper>
      <RegisterServer transactionIdentifier={transactionIdentifier} returnUrl={returnUrl} />
    </AuthWrapper>
  );
}
