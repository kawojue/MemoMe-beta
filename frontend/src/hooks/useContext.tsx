"use client"
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [auth, setAuth] = useState<any>({})

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem("token") as any) || {})
    }, [])

    return (
        <Context.Provider value={{

        }}>
            {children}
        </Context.Provider>
    )
}

const useAuth = () => {
    const context: any = useContext(Context)
    if (!context) {
        throw new Error("___")
    }
    return context
}

export default useAuth