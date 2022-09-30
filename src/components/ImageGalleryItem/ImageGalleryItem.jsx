import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { useState, useCallback } from 'react';

const ImageGalleryItem = ({ image }) => {
  const { largeImageURL, webformatURL, tags } = image;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, [setIsModalOpen]);

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={toggleModal} />
      {isModalOpen && (
        <Modal src={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
