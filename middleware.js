import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // where to redirect unauthenticated users
    signOut: "/logout",
    error: "/error",
  },
  callbacks: {
    // only allow requests with a valid token/session
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  // protect only dashboard/admin-related routes (explicit & safer)
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*",],
};
