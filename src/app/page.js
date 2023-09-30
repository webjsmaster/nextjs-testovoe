'use client'
import {useContext} from "react";
import {Context} from "@/components/provider/Provider";
import style from './Page.module.scss';
import cn from "classnames";

export default function Home() {
    const {isOpen, setIsOpen, setType} = useContext(Context);


    const handlerLogin = () => {
        setType('login');
        setIsOpen(!isOpen);
    }

    const handlerRegister = () => {
        setType('reg')
        setIsOpen(!isOpen)
    }

    return (
        <div className='h-full'>
            <div className={style.container}>
                <div className={style.title}>Выберите действие</div>
                <div className={style.blockBtn}>
                    <button onClick={() => handlerLogin()} className={cn(style.loginBtn, style.btn)}>Login</button>
                    <button onClick={() => handlerRegister()} className={cn(style.regBtn, style.btn)}>Registration</button>
                </div>
            </div>
        </div>
    )
}
