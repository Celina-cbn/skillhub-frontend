export interface IInputs {
  id: number,
  name: string,
  type: 'text' | 'password'
}

export interface ILogin {
  email: string, 
  password: string
}