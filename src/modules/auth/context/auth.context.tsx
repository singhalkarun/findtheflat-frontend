import { Context, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextInterface {
  phone: string
  sessionId: string
  otp: string
  fullName: string
  email: string
  setSessionId: Function
  setOtp: Function
  setPhone: Function
  setFullName: Function
  setEmail: Function
  accessToken: string
  setAccessToken: Function
}

interface Props {
  children: any
}

const AuthContext: Context<AuthContextInterface | null> =
  createContext<AuthContextInterface | null>(null)

export const AuthContextProvider = ({ children }: Props) => {
  const [phone, setPhone] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string>('')

  useEffect(() => {
    if (accessToken !== '' && accessToken !== undefined) {
      window.localStorage.setItem('accessToken', accessToken)
    }
  }, [accessToken])

  useEffect(() => {
    const storedAccessToken = window.localStorage.getItem('accessToken')

    if (storedAccessToken !== '' && storedAccessToken !== null) {
      setAccessToken(storedAccessToken)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        phone,
        setPhone,
        sessionId,
        setSessionId,
        otp,
        setOtp,
        fullName,
        setFullName,
        email,
        setEmail,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error(
      'Component must be enclosed by AuthContextProvider to be able to use AuthContext'
    )
  }

  return auth
}

export default useAuth
