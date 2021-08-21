import { User } from '../../@types'
import styles from './styles.module.css'

type Props = {
  user: User
  onClick(): void
}

export const CardUser = ({ user, onClick }: Props) => {
  return (
    <div className={styles.row} onClick={onClick}>
      <div className={styles.card}>
        <h4>ID: <span>{user.id}</span></h4>
        <h4>Username: <span>{user.username}</span></h4>
      </div>
    </div>
  )
}