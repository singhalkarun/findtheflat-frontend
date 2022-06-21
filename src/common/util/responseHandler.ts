import { title } from 'process'
import { toast } from 'react-hot-toast'

export function handleResponse(response: any) {
  if (response.data) {
    return response.data.data
  }

  return response
}

export function handleError(err: any) {
  let errorMessage
  if (typeof err?.response?.data?.data?.message == 'object') {
    errorMessage = err?.response?.data?.data?.message[0]
  } else {
    errorMessage = err?.response?.data?.data?.message
  }
  toast.error(errorMessage, {
    position: 'top-right',
    duration: 1000,
  })
  throw err
}
