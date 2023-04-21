import { useEffect } from 'react'
import IsUser from '@/components/User'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from 'next/router'

const User = ({ data }: { data: any }) => {
    const router: NextRouter = useRouter()

    useEffect(() => {
        if (data.err) {
            router.push("/404")
        }
    }, [router, data])

    return (
        <IsUser user={data.user} />
    )
}

export const getServerSideProps = async (query: any) => {
    let data: any = {}
    await axios.get(`/api/${query.params.user}`)
    .then((res: any) => {
        data = res.data
    })
    .catch((err: any) => {
        data = {err: ""}
    })

    return {
        props: {
            data
        }
    }
}

export default User