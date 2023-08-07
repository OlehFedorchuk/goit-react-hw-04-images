import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ imageUrl, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleKeyPress = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;