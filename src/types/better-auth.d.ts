import "better-auth";

declare module "better-auth" {
  interface User {
    // add the fields you registered in your auth config
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role: "customer" | "admin" | "vendor";
  }
}
