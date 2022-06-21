import { useState } from 'react'
import apiAuth from '../apis/auth.api'
import useAuth from '../context/auth.context'
import { CheckPhoneModal } from './CheckPhoneModal'
import { LoginModal } from './LoginModal'
import { SignupModal } from './SignupModal'

const LoginButton = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [signupModal, setSignupModal] = useState<boolean>(false)
  const [checkPhoneModal, setCheckPhoneModal] = useState<boolean>(false)

  const {
    phone,
    setPhone,
    sessionId,
    setSessionId,
    setFullName,
    otp,
    fullName,
    email,
    setAccessToken,
  } = useAuth()

  const loginButtonHandler = () => {
    setCheckPhoneModal(true)
  }

  const checkPhoneHandler = async () => {
    const checkPhoneResponse = await apiAuth.checkPhone({
      phone: `+91${phone}`,
    })

    const sendOtpResponse = await apiAuth.sendOtp({
      phone: `+91${phone}`,
    })

    if (sendOtpResponse) {
      setSessionId(sendOtpResponse.sessionId)
    }
    console.log(checkPhoneResponse)

    if (checkPhoneResponse) {
      setFullName(checkPhoneResponse.fullName)

      console.log('CheckPhoneRes', checkPhoneResponse?.userExists)

      if (checkPhoneResponse?.userExists == true) {
        console.log('User Exists')
        setCheckPhoneModal(false)
        setLoginModal(true)
      } else {
        console.log('User Does Not Exists')
        setCheckPhoneModal(false)
        setSignupModal(true)
      }
    }
  }

  const loginHandler = async () => {
    const loginResponse = await apiAuth.login({
      phone: `+91${phone}`,
      sessionId,
      otp,
    })

    if (loginResponse) {
      const accessToken = loginResponse.accessToken

      console.log(accessToken)

      setAccessToken(accessToken)
      setLoginModal(false)
    }
  }

  const signupHandler = async () => {
    const signupResponse = await apiAuth.signup({
      phone: `+91${phone}`,
      sessionId,
      otp,
      fullName,
      email,
    })

    if (signupResponse) {
      const accessToken = signupResponse.accessToken

      console.log(accessToken)

      setAccessToken(accessToken)
      setSignupModal(false)
    }
  }

  return (
    <>
      <LoginModal
        showModal={loginModal}
        setShowModal={setLoginModal}
        clickHandler={loginHandler}
      />
      <SignupModal
        showModal={signupModal}
        setShowModal={setSignupModal}
        clickHandler={signupHandler}
      />
      <CheckPhoneModal
        showModal={checkPhoneModal}
        setShowModal={setCheckPhoneModal}
        clickHandler={checkPhoneHandler}
      />
      <button className='btn btn-outline' onClick={() => loginButtonHandler()}>
        Login/SignUp
      </button>
    </>
  )
}

export default LoginButton
