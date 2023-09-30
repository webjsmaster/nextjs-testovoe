'use client'

import style from './Page.module.scss';
import {DownloadIcon} from "@/components/icons";
import {createRef, useContext, useEffect, useRef, useState} from "react";
import {Cropper} from "react-cropper";
import 'cropperjs/dist/cropper.css';
import './cropStyle.css';
import cn from "classnames";
import {file2Base64} from "@/helpers/file2Base64";
import {useSWRConfig} from "swr";
import {fetcher} from "@/helpers/fetcher";
import {useRouter} from "next/navigation";
import {Context} from "@/components/provider/Provider";


const Upload = () => {
    const [token, setToken] = useState();
    const [error, setError] = useState('');
    const [errorApi, setErrorApi] = useState('');
    const [successApi, setSuccessApi] = useState('');
    const [uploaded, setUploaded] = useState(null);
    const {push} = useRouter();
    const {isAuth} = useContext(Context);
    const cropperRef = createRef();
    const ref = useRef(null);
    const {mutate} = useSWRConfig();


    useEffect(() => {
        !isAuth && push('/');
    }, [isAuth, push]);

    useEffect(() => {
        setToken(localStorage.getItem('token-tt'))
    }, []);

    const handleClick = () => {
        setSuccessApi('');
        setErrorApi('');
        setError('');
        ref.current?.click();
    };


    const handleFile = async (e) => {
        const currentFile = e.target.files[0];
        const type = currentFile.type.split('/')[1];

        console.log('[45] 🥕: ', type === 'png');
        if (currentFile.size > 5242880) {
            setError('Размер файла не должен превышать 5 Мб');
        } else if (type !== 'png' && type !== 'jpeg' && type !== 'svg+xml' &&
            type !== 'gif') {
            setError('Файл должен быть картинкой');
        } else {
            file2Base64(currentFile).then((base64) => {
                setUploaded(base64);
            });
        }
    }


    const onCrop = async () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const cropperResult = cropper.getCroppedCanvas().toDataURL()
        localStorage.setItem('avatar-tt', cropperResult);
        const {ok, error} = await api(cropperResult);

        if (ok) {
            setUploaded(null);
            setSuccessApi('Аватар успешно загружен')
        } else if (error) {
            setErrorApi(error);
            setTimeout(() => {
                push('/')
            }, 1000)
        }
    }

    const onCansel = () => {
        setUploaded(null);
    }

    const api = async (cropperResult) => {
        const baseUrl = 'https://test-task.test211.workers.dev/account/image';
        return await mutate(baseUrl, fetcher(baseUrl, {
            method: 'PUT',
            headers: {'token-tt': token},
            body: JSON.stringify({
                image: cropperResult
            })
        })).then(res => res)

    }


    if (isAuth) {
        return (
            <div className='h-full'>
                <div className={style.container}>
                    <div className={style.breadcrumbs}>
                        <span>Главная</span> / Настройки аккаунта / Загрузка аватара
                    </div>
                    <div className={style.title}>
                        {uploaded ? 'Фото для аватарки' : 'Загрузка аватара'}
                    </div>

                    {uploaded ?
                        <>
                            <div className='w-full mt-8'>
                                <Cropper
                                    src={uploaded}
                                    style={{height: 198, width: 375}}
                                    aspectRatio={1}
                                    ref={cropperRef}
                                    background={false}
                                    guides={true}
                                />
                            </div>
                            <div className={style.blockBtn}>
                                <button className={style.button} onClick={onCrop}>Сохранить</button>
                                <button className={cn(style.canselBtn, style.button)} onClick={onCansel}>Отменить</button>
                            </div>
                        </>
                        :
                        <>
                            <div className={style.subtitle}>
                                Загрузите файл размером до 5Мб
                                <div>По формату: JPG, PNG, GIF</div>
                            </div>
                            <div className={style.button} onClick={handleClick}>
                                Выбрать файл
                                <input type='file' ref={ref} onInput={(e) => handleFile(e)}/>
                                <div>
                                    <DownloadIcon/>
                                </div>
                            </div>
                        </>
                    }


                    {error && <div className={style.error}>{error}</div>}
                    {errorApi && <div className={style.error}>{errorApi}</div>}
                    {successApi && <div className={style.success}>{successApi}</div>}
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

export default Upload;
