import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import fetchImages from 'services/api';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    isloading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isloading: true, error: null });
      fetchImages(query, page)
        .then(response => {
          if (!response.totalHits) {
            return toast.error('Bad query! Please try again.');
          }
          this.setState(({ images }) => ({
            images:
              page === 1 ? [...response.hits] : [...images, ...response.hits],
            totalImages: response.totalHits,
          }));
        })
        .catch(error =>
          this.setState({
            error: toast.error('Something was wrong, please try again.'),
          })
        )
        .finally(() => this.setState({ isloading: false }));
    }
  }

  //An example of using async/await

  // handlefetchImages = async (query, page, totalImages) => {
  //   try {
  //     const response = await fetchImages(query, page, totalImages);
  //     this.setState(({images}) => ({
  //       images: page === 1 ? [...response.hits] : [...images, ...response.hits],
  //       totalImages: response.totalHits,
  //     }));
  //   } catch (error) {
  //     this.setState({
  //       error: toast.error('Something wrong, please try again'),
  //     });
  //   } finally {
  //     this.setState({ isloading: false });
  //   }
  // };

  loadNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  renderButtonOrLoader = () => {
    const { isloading, images, totalImages } = this.state;
    return isloading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImages && (
        <Button onLoadMore={this.loadNextPage} />
      )
    );
  };
  render() {
    return (
      <Container>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoader()}
      </Container>
    );
  }
}

export default App;
