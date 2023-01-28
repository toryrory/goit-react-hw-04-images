import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onCloseModal, picture }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  const handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClose}>
      <ModalImg>
        <img src={picture} alt="img" />
      </ModalImg>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };
//   handleBackdropClose = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClose}>
//         <ModalImg>
//           <img src={this.props.picture} alt="img" />
//         </ModalImg>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
// export default Modal;
