'use client'
import {createContext, useState} from "react";

export const Context = createContext({})

const Provider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('login');
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Context.Provider value={{isOpen, setIsOpen, type, setType, isAuth, setIsAuth}}>
            {children}
        </Context.Provider>
    )
}

export default Provider
