import Meta from "./Meta"
import { Toaster } from "react-hot-toast"
import { Analytics } from '@vercel/analytics/react'


const Layout = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Meta />
            <Analytics />
            <Toaster
            position="top-center"
            reverseOrder={false}/>
            { children }
        </>
    )
}

export default Layout