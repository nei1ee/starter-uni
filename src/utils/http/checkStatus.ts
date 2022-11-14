import { usePageStoreWidthOut } from '~/stores/page'

const { showNotify } = usePageStoreWidthOut()

export function checkStatus(
  status: number,
  message: string,
): void {
  let errorMessage = ''

  switch (status) {
    case 400:
      errorMessage = `${message}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errorMessage = 'The user does not have permission (token, user name, password error)!'
      // clean token
      break
    case 403:
      errorMessage = 'The user is authorized, but access is forbidden!'
      break
    // 404请求不存在
    case 404:
      errorMessage = 'Network request error, the resource was not found!'
      break
    case 405:
      errorMessage = 'Network request error, request method not allowed!'
      break
    case 408:
      errorMessage = 'Network request timed out!'
      break
    case 500:
      errorMessage = 'Server error, please contact the administrator!'
      break
    case 501:
      errorMessage = 'The network is not implemented!'
      break
    case 502:
      errorMessage = 'Network Error!'
      break
    case 503:
      errorMessage = 'The service is unavailable, the server is temporarily overloaded or maintained!'
      break
    case 504:
      errorMessage = 'Network timeout!'
      break
    case 505:
      errorMessage = 'The http version does not support the request!'
      break
    default:
  }

  if (errorMessage) {
    showNotify({
      color: 'danger',
      duration: 2000,
      content: errorMessage,
    })
  }
}
