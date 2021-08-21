import { GetStaticPaths, GetStaticProps } from "next"

import styles from '../../styles/userPage.module.css'
import { User } from "../../@types"

type Props = {
  user: User
}

export default function UserPage({ user }: Props) {
  return (
    <div className={styles.container}>
      <header>
        <h1>Desafio Confiax</h1>
      </header>
      <main>
        <h3>ID: <span>{user.id}</span></h3>
        <h3>Username: <span>{user.username}</span></h3>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/${id}`)
  const data = await response.json()

  return {
    props: {
      user: data
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: '' } }
    ],
    fallback: "blocking"
  }
}