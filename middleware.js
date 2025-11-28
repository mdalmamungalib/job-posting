import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/login",
    register: "/signup",
    signOut: "/logout",
    error: "/error",
  },
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|register-seller|seller-pricing|verifyEmail|forgot-password|reset-password|products|$).*)",
  ],
}