import Header from "./HeaderB"
import useAuth from "@/hooks/useAuth"
import axios from "@/pages/api/instance"
import { NextRouter, useRouter } from "next/router"

const Profile: React.FC<{ token: string }> = ({ token }) => {
    const { notify }: any = useAuth()
    const router: NextRouter = useRouter()

    const handleLogout = async (): Promise<void> => {
        await axios.get('/account/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: any) => {
            localStorage.clear()
            router.push("/")
        }).catch((err: any) => {
            notify("error", err.code)
        })
    }

    return (
        <main>
            <Header logout={handleLogout} />
        </main>
    )
}

export default Profile