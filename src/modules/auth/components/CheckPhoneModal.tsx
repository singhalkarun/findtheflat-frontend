import Modal from 'react-modal'
import apiAuth from '../apis/auth.api'
import useAuth from '../context/auth.context'

interface Props {
  showModal: boolean
  setShowModal: Function
  clickHandler: Function
}

export const CheckPhoneModal = ({
  showModal,
  setShowModal,
  clickHandler,
}: Props) => {
  const { phone, setPhone, sessionId, setSessionId, setFullName } = useAuth()

  return (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      <h1 className='mb-2'>Login/SignUp</h1>
      <div>
        <input
          type='text'
          placeholder='Phone'
          className='w-full max-w-xs mb-2 input input-bordered'
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />
      </div>
      <div>
        <button className='mb-2 btn' onClick={() => clickHandler()}>
          Send OTP
        </button>
      </div>
    </Modal>
  )
}
