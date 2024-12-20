import React, { useState } from 'react';
import Popup from '../Popup/Popup';
import Tabbar from '../Tabbar/Tabbar';
import Styles from './BottomOverlay.module.css';
import ContactPopup from '../Popup/PopupItems/ContactPopup/ContactPopup';
import GiftPopup from '../Popup/PopupItems/GiftPopup/GiftPopup';
import LocationPopup from '../Popup/PopupItems/LocationPopup/LocationPopup';
import Rsvp from '../Popup/PopupItems/RSVP/Rsvp';

const BottomOverlay = () => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  const handleClose = () => {
    setOpenPopup(null);
  };

  const handleSelect = (title: string) => {
    setOpenPopup((prevTitle) => (prevTitle === title ? null : title));
  };

  return (
    <div className={Styles["bottom-overlay-container"]}>
      <Popup title="Contact" isOpen={openPopup === 'Contact'} component={<ContactPopup />} />
      <Popup title="Location" isOpen={openPopup === 'Location'} component={<LocationPopup />} />
      <Popup title="Gift" isOpen={openPopup === 'Gift'} component={<GiftPopup />} />
      <Popup title="RSVP" isOpen={openPopup === 'RSVP'} component={<Rsvp onClose={handleClose} />} />
      <Tabbar onSelect={handleSelect} onClose={handleClose} />
    </div>
  );
};

export default BottomOverlay;