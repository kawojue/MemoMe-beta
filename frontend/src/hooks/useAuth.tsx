/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context: any = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [auth, setAuth] = useState<any>({})
    const [aside, setAside] = useState<boolean>(false)

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem("token") as any) || {})
    }, [])

    return (
        <Context.Provider value={{
            auth, aside, setAside
        }}>
            {children}
        </Context.Provider>
    )
}

const useAuth: any = () => {
    const context:any = useContext(Context)
    if (context ===  undefined) {
        throw new Error("___");
    }
    return context
}

export default useAuth