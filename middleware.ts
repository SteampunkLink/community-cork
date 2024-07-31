export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/myposts", "/connections", "/connections/search", "/profile", "/settings", "/user/:id"]
}