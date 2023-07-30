/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import useStore from './useStore'
import { useEffect } from 'react'

const useToken = () => {
    const { token, setToken } = useStore()
    const storedToken: string = localStorage.getItem('token')!

    useEffect(() => {
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    return token
}

export default useToken