import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRef = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, onClose, tags }) => {
  useEffect(() => {
    const onCloseByEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseByEscape);

    return () => {
      window.removeEventListener('keydown', onCloseByEscape);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRef
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
