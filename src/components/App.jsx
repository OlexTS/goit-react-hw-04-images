import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import fetchImages from 'services/api';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';
import Button from './Button';
import Loader from './Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    const handlefetchImages = async () => {
      try {
        const response = await fetchImages(query, page);
        setImages(prevImages =>
          page === 1 ? [...response.hits] : [...prevImages, ...response.hits]
        );
        setTotalImages(response.totalHits);
        if (!response.totalHits)
          return toast.error('Bad query! Please try again.');
      } catch (error) {
        toast.error('Something was wrong, please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    handlefetchImages();
  }, [error, page, query]);

  //An example of using then/catch

  // useEffect(() => {
  //   if (query) {
  //     setError(null);
  //     setIsLoading(true);
  //     fetchImages(query, page)
  //       .then(response => {
  //         if (!response.totalHits) {
  //           return toast.error('Bad query! Please try again.');
  //         }
  //         setImages(prevImages =>
  //           page === 1 ? [...response.hits] : [...prevImages, ...response.hits]
  //         );
  //         setTotalImages(response.totalHits);
  //       })
  //       .catch(error =>
  //         error.toast.error('Something was wrong, please try again.')
  //       )
  //       .finally(() => setIsLoading(false));
  //   } else {
  //     setError(error);
  //   }
  // }, [error, page, query]);

  const loadNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {isLoading ? (
        <Loader />
      ) : (
        images.length !== 0 &&
        images.length < totalImages && <Button onLoadMore={loadNextPage} />
      )}
    </Container>
  );
};

export default App;
