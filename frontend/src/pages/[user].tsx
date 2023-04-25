/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import IsUser from '@/components/User'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from 'next/router'

const User = ({ data }: { data: any }) => {
    const router: NextRouter = useRouter()

    if (data?.err === "") {
        router.push("/404")
    }

    const countViews = async ():Promise<void> => {
        await axios.post('/api/user/count-views', JSON.stringify({ user: data.user }))
        .then((res: any) => {})
        .catch((err: any) => {})
    }

    useEffect(() => {
        (async () => await countViews())()
    }, [])

    return (
        <IsUser data={data.tempData} />
    )
}

export const getServerSideProps = async (query: any) => {
    let data: any = {}
    await axios.get(`/api/${query.params.user}`)
    .then((res: any) => {
        data = { user: res?.data.user, tempData: res.data }
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