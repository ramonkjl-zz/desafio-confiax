import { DOMAttributes, MouseEvent } from 'react'
import styles from './styles.module.css'

type Props = {
  id?: string
  value: string
  onClick?(): any
}

export const CancelButton = ({ id, value, onClick }: Props) => (
  <button
    id={id}
    className={styles.button}
    onClick={onClick}
  >
    {value}
  </button>
)
