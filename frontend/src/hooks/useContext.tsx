import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
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