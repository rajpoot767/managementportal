"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Sidebar from '@/core/widgets/Sidebar';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return undefined
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = getCookie("isAuthenticated")
    const userType = getCookie("userType")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Only redirect if user is on a dashboard root route they shouldn't access
    if (userType === "admin" && pathname === "/dashboard") {
      router.push("/dashboard/users")
    } else if (userType === "user" && pathname === "/dashboard") {
      router.push("/dashboard/departments")
    }
    // Otherwise, allow navigation to any subpage
  }, [router, pathname])

  const handleLogout = () => {
    // Clear auth cookies
    deleteCookie("isAuthenticated")
    deleteCookie("userType")
    deleteCookie("userEmail")

    // Redirect to login
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-16 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 12c0 .28-.11.53-.29.71l-3.54 3.54c-.18.18-.43.29-.71.29s-.53-.11-.71-.29L9.71 13.71c-.18-.18-.29-.43-.29-.71s.11-.53.29-.71l2.54-2.54c.18-.18.43-.29.71-.29s.53.11.71.29l3.54 3.54c.18.18.29.43.29.71zM19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2H4v1h5v2H4v1h5v2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 8h5v6H4v-6z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">MediCare Plus</h1>
                  <p className="text-sm text-gray-500">Healthcare Management System</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{getCookie("userEmail")}</p>
                  <p className="text-xs text-gray-500">
                    {getCookie("userType") === "admin" ? "Administrator" : "Staff Member"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
