import cn from 'classnames'
import style from './FooterItem.module.scss'
import {ArrowIcon, CardIcon, HomeIcon, WalletIcon} from "@/components/icons";

const FooterItem = ({item, handlerClick}) => {

    const components = {
        home: HomeIcon,
        card: CardIcon,
        arrow: ArrowIcon,
        wallet: WalletIcon,
    }
    const IconComponents = components[item.type];

    return (
        <div className={style.wrapper} onClick={() => handlerClick(item.id)}>
            <IconComponents active={item.active}/>
            <div className={cn(style.text, item.active ? 'text-myBlue' : 'text-myGray')}>{item.text}</div>
        </div>
    );
};

export default FooterItem;
