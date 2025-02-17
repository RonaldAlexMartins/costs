import { useEffect, useState } from 'react';

import styles from './Message.module.css';

function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return
        }
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg]);

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${type && styles[type] ? styles[type] : ''}`}>{msg}</div>
            )}
        </>
    )
}

export default Message;