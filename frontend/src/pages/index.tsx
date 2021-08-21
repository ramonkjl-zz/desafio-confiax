import { useContext } from 'react'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { ModalUserCreate } from '../components/ModalUserCreate'
import { AppContext } from '../contexts/App'
import styles from '../styles/signIn.module.css'

export default function signIn() {

  const { isOpen, toggle, setUserAuth } = useContext(AppContext)

  const handleClick = async () => {
    const usernameInput = (document.getElementById('username-input') as HTMLInputElement)
    const passwordInput = (document.getElementById('password-input') as HTMLInputElement)

    const user = {
      username: usernameInput.value,
      password: passwordInput.value,
    }

    if (user.username && user.password) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user-sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const data = await response.json()

      if (data.error)
        alert(data.message)
      else
        setUserAuth(data)
    }
  }

  const openModal = () => {
    toggle(preState => !preState)
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Desafio Confiax</h1>
      </header>
      <main>
        <Input id="username-input" label="Username" mb="25px" />
        <Input id="password-input" type="password" label="Password" mb="25px" />
        <Button value="Entrar" onClick={handleClick} />
        <p
          className={styles.link_create_user}
          onClick={openModal}
        >
          Ainda não possui conta?
        </p>
      </main>
      {
        isOpen && (<ModalUserCreate />)
      }
    </div>
  )
}
