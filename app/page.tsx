import Image from 'next/image'
import NewProfile from './NewProfile'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NewProfile name={"r/ChristianDating"}/>
    </main>
  )
}
