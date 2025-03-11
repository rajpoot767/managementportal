"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/templates");
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-950 via-primary-700 to-primary-950">
      <div className="text-center p-6 bg-body-50 shadow-lg rounded-lg max-w-screen-md border border-body-200">
        <h1 className="text-3xl font-extrabold text-body-900 mb-4">
          Redirecting to the Dashboard...
        </h1>
        <p className="text-lg text-body-700 mb-6">
          Please wait a moment.
        </p>
        <div className="mt-4 flex justify-center">
          <div className="size-12 border-4  border-gray-300 border-t-primary-800 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
