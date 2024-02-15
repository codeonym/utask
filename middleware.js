export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard",
    "/api/protected",
    "/api/tasks",
    "/api/collections"
  ]
}