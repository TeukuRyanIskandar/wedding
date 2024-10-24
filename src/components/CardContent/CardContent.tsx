import Welcome from '../Welcome/Welcome';
import Invitation from '../Invitation/Invitation';
import Styles from './CardContent.module.css';
import Tentative from '../Tentative/Tentative';
import Doa from '../Doa/Doa';
import Wishes from '../Wishes/Wishes';
import Music from '../Music/Music';
import Info from '../Info/Info';
import { useRef, useEffect } from 'react';

interface CardContentProps {
    isMusicPlaying: boolean;  // Accept the music playing state as a prop
}

const CardContent: React.FC<CardContentProps> = ({ isMusicPlaying }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target instanceof HTMLElement) {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove(Styles.fadeOut);
                        entry.target.classList.add(Styles.fadeIn);
                    } else {
                        entry.target.classList.remove(Styles.fadeIn);
                        entry.target.classList.add(Styles.fadeOut);
                    }
                }
            });
        }, options);
    
        const contentItems = containerRef.current?.querySelectorAll(`.${Styles["content-item"]}`);
        if (contentItems) {
            Array.from(contentItems).forEach(item => observer.observe(item));
        }

        return () => {
            if (contentItems) {
                Array.from(contentItems).forEach(item => observer.unobserve(item));
            }
        };
    }, []);
    

    return (
        <div className={Styles["card-content-container"]} ref={containerRef}>
            <div className={Styles["card-content-items"]}>
                <div className={`${Styles["welcome-wrapper"]} ${Styles["content-item"]} ${Styles["initially-seen"]}`}>
                    <Welcome />
                </div>
                <div className={`${Styles["invitation-wrapper"]} ${Styles["content-item"]} ${Styles["initially-hidden"]}`}>
                    <Invitation />
                </div>
                <div className={`${Styles["info-wrapper"]} ${Styles["content-item"]} ${Styles["initially-hidden"]}`}>
                    <Info />
                </div>
                <div className={`${Styles["tentative-wrapper"]} ${Styles["content-item"]} ${Styles["initially-hidden"]}`}>
                    <Tentative />
                </div>
                <div className={`${Styles["doa-wrapper"]} ${Styles["content-item"]} ${Styles["initially-hidden"]}`}>
                    <Doa />
                </div>
                <div className={`${Styles["wishes-wrapper"]} ${Styles["content-item"]} ${Styles["initially-hidden"]}`}>
                    <Wishes />
                </div>
                {isMusicPlaying && <Music />}
            </div>
        </div>
    );
}

export default CardContent;
