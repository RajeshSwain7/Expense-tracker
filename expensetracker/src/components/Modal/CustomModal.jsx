import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CustomModal({ isOpen, setIsOpen, children }) {
    const handleClose = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            backgroundColor : 'rgba(239, 239, 239, 0.85)',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            maxWidth : '538px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '15px',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customStyles}
        >
            {children}
        </Modal>
    );
}
