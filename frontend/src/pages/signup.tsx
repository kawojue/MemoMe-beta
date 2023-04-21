/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"

function signup() {
    const { }: any = useAuth()
    
    return (
        <>
            <Meta title="Sign Up"/>
            <form>

            </form>
        </>
    )
}

export default signup