export interface InputConfig {
  name: string
  value?: string
  iconName: string
  placeholder: string
  type?: 'text' | 'password'
  focus?: boolean
}

export type FormName = 'signIn' | 'signUp'

export interface SubmitForm {
  formData: Record<string, string>
  formName: FormName
}

export interface ValidatorFunction {
  (formData: Record<string, string>): Record<string, string> | null
}

export interface NamedValidatorFunction {
  validate: ValidatorFunction
}

export interface Validator {
  required: (fieldName: string) => ValidatorFunction
  minLength: (fieldName: string, min: number) => ValidatorFunction
  email: (fieldName: string) => ValidatorFunction
  sameAs: (fieldName: string, secondFieldName: string) => ValidatorFunction
}
