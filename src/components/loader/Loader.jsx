import style from './Loader.module.scss'

const Loader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className={style.spinner}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
