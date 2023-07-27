import Image from 'next/image'
import styles from './page.module.css'
import NewProfile from './NewProfile.tsx'

export default function Home() {
  return (
    <main className={styles.main}>
      <NewProfile community={{name:"r/ChristianDating"}}/>
    </main>
  )
}
