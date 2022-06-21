import Modal from 'react-modal'
import OtpInput from 'react-otp-input'
import useAuth from '../context/auth.context'

interface Props {
  showModal: boolean
  setShowModal: Function
  clickHandler: Function
}

export const LoginModal = ({
  showModal,
  setShowModal,
  clickHandler,
}: Props) => {
  const {
    phone,
    setPhone,
    sessionId,
    setSessionId,
    setAccessToken,
    fullName,
    otp,
    setOtp,
  } = useAuth()

  return (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      <h1>Hello {fullName?.split(' ')[0]}</h1>
      <p>Please enter OTP sent on {phone}</p>
      <OtpInput
        value={otp}
        onChange={(otp: any) => setOtp(otp)}
        numInputs={6}
        className='p-1 mr-1 border border-solid'
        separator={<span>&nbsp;</span>}
      />
      <div>
        <button className='mb-2 btn' onClick={() => clickHandler()}>
          Login
        </button>
      </div>
    </Modal>
  )
}
