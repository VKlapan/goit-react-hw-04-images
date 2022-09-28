import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getGalleryData } from 'servises/handleApi';

import { Gallery } from './ImageGallery/ImageGallery.styled';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    loading: false,
    error: null,
    page: 1,
    total: 1,
  };

  async componentDidMount() {
    //   this.getImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }

    if (
      prevState.page !== this.state.page &&
      prevState.query === this.state.query
    ) {
      this.getImages();
    }
    this.scrollPage();
  }

  searchImage = query => {
    this.setState({
      loading: true,
      query: query,
      error: null,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async getImages() {
    await getGalleryData(this.state.query, this.state.page)
      .then(result => {
        const newImages = [...this.state.images, ...result.images];
        this.setState({ images: newImages, total: result.total });
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ loading: false }));
  }

  scrollPage() {
    const { height: cardHeight } = document
      .querySelector('#gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { images, total } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.searchImage} />
        <Gallery id="gallery">
          {this.state.loading && <Loader />}
          {this.state.error && <div>Opsss... {this.state.error}</div>}
          <ImageGallery images={images} />
          {this.state.page < total && !this.state.error && (
            <Button clickHandle={this.loadMore}>LOAD MORE</Button>
          )}
        </Gallery>
      </>
    );
  }
}
