import { useEffect } from 'react'
import useAuth from "@/hooks/useAuth"
import decrypt from '@/utils/decryption'
import axios from "@/pages/api/instance"

const Profile: React.FC<{ data: any }> = ({ data }) => {

    return (
        <article>
            <p>Profile</p>
        </article>
    )
}

export default Profile