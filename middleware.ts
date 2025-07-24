import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === "/"

  // Check if user is authenticated
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value
  const userType = request.cookies.get("userType")?.value

  // Redirect to login if accessing protected route without authentication
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect authenticated users based on their role
  if (isAuthenticated && isPublicPath) {
    if (userType === "admin") {
      return NextResponse.redirect(new URL("/dashboard/users", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard/departments", request.url))
    }
  }

  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
} 