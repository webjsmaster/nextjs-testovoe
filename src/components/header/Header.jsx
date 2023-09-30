import style from './Header.module.scss';
import Image from "next/image";
import logo from '@/../public/logo.svg';
import find from '@/../public/find.svg';
import userIcon from '@/../public/icon-user.svg'

const Header = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className='mb-4'>
                    <Image src={logo} alt='logo' width='100%' height='100%'/>
                </div>
                <div className={style.name}>
                    СoinsFill
                </div>
            </div>
            <div className={style.content}>
                <div>
                    <Image src={find} alt='find' width='100%' height='100%'/>
                </div>
                <Image src={userIcon} alt='find' width='100%' height='100%'/>
            </div>
        </div>
    );
};

export default Header;
