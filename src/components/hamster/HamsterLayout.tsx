"use client";
import { FC, useEffect, useState } from "react";
import { Hamster } from ".";
import styles from './layout.module.css';

const HamsterLayout: FC<any> = () => {
    const [isStartEscape, setIsStartEscape] = useState(false);
    const [isEscaped, setIsEscaped] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isStartEscape) {
            timeout = setTimeout(() => {
                setIsEscaped(true);
            }, 1_500);
        }
        return () => clearTimeout(timeout);
    }, [isStartEscape]);
    return (
        <>
            {!isEscaped
                ? <p className={styles.text}>He always tries to escape 😥</p>
                : <p className={`${styles.text} ${isEscaped ? styles.alarm : ''}`}>Where is he? 😱</p>}
            <div
                className={styles.wrapper}
                onMouseOver={() => {
                    setIsStartEscape(false)
                    setIsEscaped(false);
                }}
                onMouseLeave={() => {
                    return setIsStartEscape(true);
                }}
            >
                <Hamster isEscaped={isEscaped} />
            </div>
        </>
    );
}

export default HamsterLayout;