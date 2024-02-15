import '@styles/globals.css'
import SessionProvider from '@dashboard/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { Toaster } from "react-hot-toast"
export const metadata = {
  title: 'Utask',
  description: 'Manage your tasks with ease'

}
const RootLayout = async ({ children }) => {

  const session = await getServerSession()
  return (
    <html lang={"en"}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Toaster position={"top-right"} />
      </body>
    </html>
  )
}

export default RootLayout;