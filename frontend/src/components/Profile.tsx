import { useEffect } from 'react'
import useAuth from "@/hooks/useAuth"
import decrypt from '@/utils/decryption'
import axios from "@/pages/api/instance"

const Profile: React.FC<{ token?: string }> = ({ token }) => {

    return (
        <article>
            <p>Profile</p>
        </article>
    )
}

export default Profile