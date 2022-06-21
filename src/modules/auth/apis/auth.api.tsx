import {
  CHECK_PHONE_URL,
  LOGIN_URL,
  REGISTER_URL,
  SEND_OTP_URL,
} from '@common/constants'
import { handleError, handleResponse } from '@common/util/responseHandler'
import axios from 'axios'

interface CheckPhoneModel {
  phone: string
}

interface LoginModel {
  phone: string
  sessionId: string
  otp: string
}

interface SignupModel {
  phone: string
  sessionId: string
  otp: string
  fullName: string
  email: string
}

interface SendOtpModel {
  phone: string
}

class ApiAuth {
  login!: (loginModel: LoginModel) => Promise<any>
  signup!: (signupModel: SignupModel) => Promise<any>
  checkPhone!: (checkPhoneModel: CheckPhoneModel) => Promise<any>
  sendOtp!: (sendOtpModel: SendOtpModel) => Promise<any>

  constructor() {
    this.checkPhone = async (checkPhoneModal: CheckPhoneModel) => {
      try {
        const res = await axios.get(
          `${CHECK_PHONE_URL}/${checkPhoneModal.phone}`
        )

        return handleResponse(res)
      } catch (error) {
        return handleError(error)
      }
    }

    this.login = async (loginModel: LoginModel) => {
      try {
        const res = await axios.post(LOGIN_URL, loginModel)

        return handleResponse(res)
      } catch (error) {
        return handleError(error)
      }
    }

    this.signup = async (signupModel: SignupModel) => {
      try {
        const res = await axios.post(REGISTER_URL, signupModel)

        return handleResponse(res)
      } catch (error) {
        return handleError(error)
      }
    }

    this.sendOtp = async (sendOtpModel: SendOtpModel) => {
      try {
        const res = await axios.post(SEND_OTP_URL, sendOtpModel)

        return handleResponse(res)
      } catch (error) {
        return handleError(error)
      }
    }
  }
}

const apiAuth = new ApiAuth()

export default apiAuth
