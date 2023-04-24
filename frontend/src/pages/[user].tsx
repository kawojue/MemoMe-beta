import IsUser from '@/components/User'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from 'next/router'

const User = ({ data }: { data: any }) => {
    const router: NextRouter = useRouter()

    if (data?.err === "") {
        router.push("/404")
    }

    return (
        <IsUser data={data} />
    )
}

export const getServerSideProps = async (query: any) => {
    let data: any = {}
    await axios.get(`/api/${query.params.user}`)
    .then((res: any) => {
        data = res.data
    })
    .catch((err: any) => {
        data = { err: err?.code || '' }
    })

    return {
        props: {
            data
        }
    }
}

export default User