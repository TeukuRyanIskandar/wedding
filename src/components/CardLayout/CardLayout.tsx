import { useState } from 'react';
import Arc from "../Arc/Arc";
import Styles from "./CardLayout.module.css";
import BottomOverlay from "../BottomOverlay/BottomOverlay";
import CardContent from "../CardContent/CardContent";
import monogram from '@/assets/images/monogram.png';
import Image from "next/image";
import Typography from "../Typography/Typography";

const CardLayout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setIsMusicPlaying(true);
  };

  const handleAnimationEnd = () => {
    setIsScrollable(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) {
    return (
      <div className={`${Styles["page-wrapper"]} ${Styles["scrollable"]}`}>
        <div className={Styles["layout-container"]}>
          <div className={Styles["layout-area"]}>
            <Arc />
            <CardContent isMusicPlaying={isMusicPlaying} />
            <BottomOverlay />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${Styles["page-wrapper"]} ${isScrollable ? Styles["make-scrollable"] : ""}`}>
      <div className={Styles["layout-container"]}>
        <div 
          className={`${Styles["overlay"]} ${isAnimating ? Styles["fade-out"] : ''}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className={Styles["overlay-image"]}>
            <button onClick={handleClick}>
              <Image 
                src={monogram} 
                alt={"name-monogram"}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />            
            </button>
          </div>
          <div className={Styles["overlay-text"]}>
            <Typography>
              Click to open
            </Typography>
          </div>
        </div>
        <div className={Styles["layout-area"]}>
          <Arc />
          <CardContent isMusicPlaying={isMusicPlaying} />
          <BottomOverlay />
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
