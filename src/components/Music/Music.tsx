import { useEffect, useRef } from 'react';
import Styles from './Music.module.css';

const Music = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const unmuteVideo = () => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                    '{"event":"command","func":"unMute","args":""}',
                    '*'
                );
            }
        };

        const timeoutId = setTimeout(unmuteVideo, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={Styles["music-container"]}>
            <div className={Styles["music"]}>
                <iframe 
                    ref={iframeRef}
                    width="auto" 
                    height="auto" 
                    src="https://www.youtube.com/embed/7EUrWoNsZVE?autoplay=1&loop=1&playlist=7EUrWoNsZVE&enablejsapi=1"  
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen 
                />
            </div>
        </div>
    );
}

export default Music;