import type { Validator } from '@/types/form'

function findFieldValue(fieldName: string, formData: Record<string, string>): string {
  if (fieldName in formData) {
    return formData[fieldName]
  }
  throw new TypeError(`Field ${fieldName} not found`)
}

export const validator: Validator = {
  required: (fieldName) => {
    return (formData) => {
      const fieldValue: string = findFieldValue(fieldName, formData)
      if (fieldValue.length) {
        return null
      }
      return { [fieldName]: 'This field is required' }
    }
  },
  minLength: (fieldName, min) => {
    return (formData) => {
      const fieldValue = findFieldValue(fieldName, formData)
      if (fieldValue && fieldValue.length >= min) {
        return null
      }
      return { [fieldName]: `Cannot be shorter than ${min} characters` }
    }
  },
  email: (fieldName) => {
    return (formData) => {
      const fieldValue = findFieldValue(fieldName, formData)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(fieldValue)) {
        return null
      }
      return { [fieldName]: 'Invalid email' }
    }
  },
  sameAs: (fieldName, secondFieldName) => {
    return (formData) => {
      const fieldValue = findFieldValue(fieldName, formData)
      const secondFieldValue = findFieldValue(secondFieldName, formData)
      if (fieldValue === secondFieldValue) {
        return null
      }
      return { [fieldName]: 'Passwords do not match' }
    }
  }
}
