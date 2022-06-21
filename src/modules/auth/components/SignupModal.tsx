import Modal from 'react-modal'
import OtpInput from 'react-otp-input'
import useAuth from '../context/auth.context'

interface Props {
  showModal: boolean
  setShowModal: Function
  clickHandler: Function
}

export const SignupModal = ({
  showModal,
  setShowModal,
  clickHandler,
}: Props) => {
  const {
    phone,
    setPhone,
    sessionId,
    setSessionId,
    setFullName,
    email,
    setEmail,
    fullName,
    otp,
    setOtp,
  } = useAuth()

  return (
    <Modal isOpen={showModal}>
      <h1>Signup Modal</h1>
      <input
        type='text'
        placeholder='Name'
        className='w-full max-w-xs mb-2 input input-bordered'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type='email'
        placeholder='Email'
        className='w-full max-w-xs mb-2 input input-bordered'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <OtpInput
        value={otp}
        onChange={(otp: any) => setOtp(otp)}
        numInputs={6}
        className='p-1 mr-1 border border-solid'
        separator={<span>&nbsp;</span>}
      />
      <div>
        <button className='mb-2 btn' onClick={() => clickHandler()}>
          Sign Up
        </button>
      </div>
    </Modal>
  )
}
