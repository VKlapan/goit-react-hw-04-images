import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getGalleryData } from 'servises/handleApi';

import { Gallery } from './ImageGallery/ImageGallery.styled';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    getImages();
    scrollPage();
  }, [query, page]);

  const searchImage = query => {
    setQuery(query);
    setLoading(true);
    setError(null);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const getImages = async () => {
    await getGalleryData(query, page)
      .then(result => {
        const newImages = [...images, ...result.images];
        setImages(newImages);
        setTotal(result.total);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const scrollPage = () => {
    const { height: cardHeight } = document
      .querySelector('#gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Searchbar onSubmit={searchImage} />
      <Gallery id="gallery">
        {loading && <Loader />}
        {error && <div>Opsss... {error}</div>}
        <ImageGallery images={images} />
        {page < total && !error && (
          <Button clickHandle={loadMore}>LOAD MORE</Button>
        )}
      </Gallery>
    </>
  );
};
