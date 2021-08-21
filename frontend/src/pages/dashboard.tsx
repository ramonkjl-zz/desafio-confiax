import { GetStaticProps } from 'next'
import router from 'next/router'
import { useContext } from 'react'

import { User } from '../@types'
import { CardUser } from '../components/CardUser'
import { AppContext } from '../contexts/App'
import styles from '../styles/dashboard.module.css'

type Props = {
  users: Array<User>
}

export default function Dashboard({ users }: Props) {
  const { userAuth } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <header>
        <h3>Usuário logado: {userAuth?.username}</h3>
      </header>
      <main>
        {users.map((user, index) => (
          <CardUser key={index} user={user} onClick={() => router.push(`/user/${user.id}`)} />
        ))}
      </main>
    </div>
  )
}

// Uma das feature do NextJS: renderização do lado do servidor.
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users`)
  const data = await response.json()

  console.log(data)

  return {
    props: {
      users: data
    }
  }
}