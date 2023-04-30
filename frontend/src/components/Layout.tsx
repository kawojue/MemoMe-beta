import Meta from "./Meta"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'


const Layout = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Meta />
            <Analytics />
            <ToastContainer />
            { children }
        </>
    )
}

export default Layout