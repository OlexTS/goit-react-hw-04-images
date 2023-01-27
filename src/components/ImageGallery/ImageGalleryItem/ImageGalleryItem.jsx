import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <Item onClick={handleToggleModal}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={handleToggleModal}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
