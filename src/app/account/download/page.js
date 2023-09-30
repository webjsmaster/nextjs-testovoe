'use client'
import {useContext, useEffect, useState} from 'react';
import {fetcher} from "@/helpers/fetcher";
import Loader from "@/components/loader/Loader";
import {useSWRConfig} from "swr";
import {base642File} from "@/helpers/base642File";
import Image from "next/image";
import style from './Page.module.scss';
import {useRouter} from "next/navigation";
import {Context} from "@/components/provider/Provider";


const Download = () => {
    const {mutate} = useSWRConfig();
    const {push} = useRouter();
    const {isAuth} = useContext(Context);
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageState, setImageState] = useState(null);
    const [errorApi, setErrorApi] = useState('');

    useEffect(() => {
        !isAuth && push('/');
    }, [isAuth, push]);

    useEffect(() => {
        setToken(localStorage.getItem('token-tt'))
    }, []);


    const api = async (token) => {
        setIsLoading(true)
        const baseUrl = 'https://test-task.test211.workers.dev/account/image';
        return await mutate(baseUrl, fetcher(baseUrl, {
            method: 'GET',
            headers: {'token-tt': token},
        })).then(res => {
            setIsLoading(false)
            return res
        })
    }


    const handleGet = async () => {
        const {ok, image} = await api(token);
        if (ok) {
            setImageState(base642File(image));
        } else {
            setErrorApi('Ошибка или картинка не найдена!');
            setTimeout(() => {
                push('/')
            }, 1000)
        }
    }


    if (isAuth) {
        return (
            <div className='h-full'>
                <div className='w-full flex justify-center'>
                    <button className={style.button} onClick={handleGet}>Получить</button>
                </div>
                <div className={style.container}>
                    {isLoading ? <Loader/> :
                        <>
                            {errorApi ? <div className={style.error}>{errorApi}</div> :
                                <div className={style.imageWrapper}>
                                    {imageState && <Image src={imageState} alt='avatar'/>}
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className='h-full'>
            </div>
        );
    }
};

export default Download;
