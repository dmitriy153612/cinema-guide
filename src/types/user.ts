export interface UserLogin {
  email: string
  password: string
}

export interface UserRegistration extends UserLogin {
  name: string
  surname: string
  confirmPassword: string
}

export interface UserData extends Omit<UserRegistration, 'password'> {
  favorites: string[]
}

export function isUserLogin(obj: any): obj is UserLogin {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string' &&
    Object.keys(obj).length === 2
  )
}

export function isUserRegistration(obj: any): obj is UserRegistration {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.surname === 'string' &&
    typeof obj.confirmPassword === 'string' &&
    Object.keys(obj).length === 5
  )
}
