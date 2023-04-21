import Meta from "./Meta"

const Layout = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Meta /> 
            { children }
        </>
    )
}

export default Layout