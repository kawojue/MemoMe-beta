import Meta from "./Meta"
import Header from "./HeaderA"

const Layout = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Meta /> 
            { children }
        </>
    )
}

export default Layout