import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRef = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }

  onCloseByEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, onClose, tags } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRef
    );
  }
}

export default Modal;
