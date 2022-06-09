export const mockUserReturn = {
  user: {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTQxODY1ODMsImV4cCI6MTY1NDc5MTM4M30.BXl0w0f4QeY06bsrLtQwcA1xaaeNBvsqNdxKMfaFPd4"
}
export const mockUser = {
  id: 2,
  username: "User",
  role: "user",
  email: "user@user.com"
}
export type User = {
  user: {
    id: number,
    username: string,
    role: string,
    email: string
  },
  token: string
}