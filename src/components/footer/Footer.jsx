'use client'
import style from './Footer.module.scss'
import FooterItem from "@/components/footer/footer-item/FooterItem";
import {useState} from "react";


const Footer = () => {
    const [item, setItem] = useState([
        {
            id: 0,
            type: 'home',
            text: 'ראשי',
            active: true,
        },
        {
            id: 1,
            type: 'card',
            text: 'מפות',
            active: false,
        },
        {
            id: 2,
            type: 'arrow',
            text: 'תרגומים',
            active: false,
        },
        {
            id: 3,
            type: 'wallet',
            text: 'גיוס כספים',
            active: false,
        }
    ]);

    const handlerClick = (id) => {
        const newArr = item.map(i => i.id !== id ? {...i, active: false} : {...i, active: true})
        setItem(newArr);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {item && item.map(i => <FooterItem key={i.id} item={i} handlerClick={handlerClick} />)}
            </div>
        </div>
    );
};

export default Footer;
