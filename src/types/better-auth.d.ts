import "better-auth";

declare module "better-auth" {
  interface User {
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role: "customer" | "admin" | "vendor";
  }
}
