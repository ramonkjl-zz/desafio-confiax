import routes from 'next/router'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type Props = {
  children: ReactNode
}


type StateContext = {
  isOpen: boolean
  toggle: Dispatch<SetStateAction<boolean>>
  userAuth: userAuth
  setUserAuth: Dispatch<SetStateAction<userAuth>>
}

export const AppContext = createContext({} as StateContext)

type userAuth = {
  id: string
  username: string
}

export const AppContextProvider = ({ children }: Props) => {
  const [isOpen, toggle] = useState(false)
  const [userAuth, setUserAuth] = useState<userAuth>()

  useEffect(() => {
    if (userAuth?.id && userAuth?.username)
      routes.push('/dashboard')
    else
      routes.push('/')
  }, [userAuth])

  return (
    <AppContext.Provider
      value={{
        isOpen,
        toggle,
        userAuth,
        setUserAuth
      }}>
      {children}
    </AppContext.Provider>
  )
}