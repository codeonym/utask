import Sidebar from "@dashboard/components/Sidebar"
import Navbar from "@dashboard/components/Navbar"
import Breadcrumbs from "./components/Breadcrumb"

export const metadata = {
  title: 'Utask',
  description: 'Manage your tasks with ease'

}
const RootLayout = ({ children }) => {
  
  return (
    <main
      className="
      flex w-full"
    >
      <Sidebar />
      <div className="
      w-full flex flex-col 
      ">
        <Navbar />
        <Breadcrumbs />
        {children}
      </div>
    </main>
  )
}

export default RootLayout;