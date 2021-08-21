import styles from './styles.module.css'

type Props = {
  id?: string
  label: string
  type?: string
  mb?: string
}

export const Input = ({ id, label, type = "text", mb }: Props) => (
  <div className={styles.group}
    style={{
      marginBottom: `${mb}`
    }}
  >
    <input id={id} type={type} required />
    <span className={styles.high_light}></span>
    <span className={styles.bar}></span>
    <label>{label}</label>
  </div>
)
