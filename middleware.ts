import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/dashboard/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "f3a9e1d8c2b74059a8e6b12f4d89a7c3e5b012487c9f8a124b6d0e8c715234",
});

export const config = {
  matcher: ["/dashboard/((?!login).*)", "/dashboard"],
};
