export interface LoginResponse{
    user: {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    __v: 2
  },
  token: string
}