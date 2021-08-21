import { useContext, useState } from 'react'

import { AppContext } from '../../contexts/App'
import { Button } from '../Button'
import { CancelButton } from '../CancelButton'
import { Input } from '../Input'
import styles from './styles.module.css'

type UserCreate = {
  username: string
  password: string
  repeatPassword: string
}

export const ModalUserCreate = () => {
  const { toggle, setUserAuth } = useContext(AppContext)
  const [errorsInput, setErrorsInput] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  })

  const handleSubmit = async () => {
    const usernameInput = (document.getElementById('username-input') as HTMLInputElement)
    const passwordInput = (document.getElementById('password-input') as HTMLInputElement)
    const repeatPasswordInput = (document.getElementById('repeat-password-input') as HTMLInputElement)

    const user: UserCreate = {
      username: usernameInput.value,
      password: passwordInput.value,
      repeatPassword: repeatPasswordInput.value
    }

    if (!hasErrors(user)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user-create`, {
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

  const hasErrors = (user: UserCreate) => {
    const errors = {
      username: '',
      password: '',
      repeatPassword: '',
    }

    if (!user.username)
      errors.username = 'Nome de usuário vazio.'
    if (!user.password)
      errors.password = 'Senha vazia.'
    if (user.password !== user.repeatPassword)
      errors.repeatPassword = 'Senhas não coincidem.'

    setErrorsInput(errors)

    if (
      errors.password
      || errors.password
      || errors.repeatPassword
    )
      return true
    return false
  }

  return (
    <div className={styles.container}>
      <main>
        <div style={{ height: '33px', marginBottom: '45px' }}>
          <Input id="username-input" label="Nome de usuário" />
          {errorsInput.username && <span className={styles.error}>{errorsInput.username}</span>}
        </div>

        <div style={{ height: '33px', marginBottom: '45px' }}>
          <Input id="password-input" label="Uma senha" type="password" />
          {errorsInput.password && <span className={styles.error}>{errorsInput.password}</span>}
        </div>

        <div style={{ height: '33px', marginBottom: '12px' }}>
          <Input id="repeat-password-input" label="Confirme a senha" type="password" />
          {errorsInput.repeatPassword && <span className={styles.error}>{errorsInput.repeatPassword}</span>}
        </div>

        <div className={styles.buttons}>
          <Button value="Criar conta" onClick={handleSubmit} />
          <CancelButton value="Cancelar" onClick={() => toggle(preState => !preState)} />
        </div>
      </main>
    </div>
  )
}