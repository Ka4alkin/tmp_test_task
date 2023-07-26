export default interface User {
  name: string
  surname: string
  email: string
  phoneNumber: string
  password: string
}

export interface AuthState {
  user: User | null
}
