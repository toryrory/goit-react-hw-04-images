import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  notifications,
  onEmptyNotification,
} from './Notifications/notifications';
import { injectStyle } from 'react-toastify/dist/inject-style'; // CALL IT ONCE IN YOUR APP
import { Container } from './App.styled';
import fetchImages from 'services-api/fetchImages';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader/';
import Modal from './Modal';
injectStyle();

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        const imagesData = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });
        const totalPages = Math.ceil(totalHits / perPage);

        setImages(prevImages => [...prevImages, ...imagesData]);
        setHasMoreImages(page < totalPages);
        notifications(hits, page, totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = picture => {
    setLargeImageURL(picture);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  const handleSubmit = newQuery => {
    onEmptyNotification(newQuery);
    setQuery(newQuery);
    if (query !== newQuery) {
      setImages([]);
      setPage(1);
      setError(null);
    }
  };
  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery onClick={openModal} images={images} />
      )}
      {hasMoreImages && ( // images.length > 0 &&
        <LoadMoreBtn loadMore={loadMoreImages} />
      )}
      {largeImageURL && (
        <Modal onCloseModal={closeModal} picture={largeImageURL} />
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}

// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     isLoading: false,
//     error: null,
//     largeImageURL: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.query;
//     const currentQuery = this.state.query;
//     const { page, images } = this.state;
//     const perPage = 12;

//     if (prevQuery !== currentQuery || prevState.page !== page) {
//       this.setState({ isLoading: true });

//         fetchImages(currentQuery, page)
//           .then(({ hits, totalHits }) => {
//             const totalPages = Math.ceil(totalHits / perPage);
//             const imagesData = hits.map(
//               ({ id, webformatURL, largeImageURL }) => {
//                 return { id, webformatURL, largeImageURL };
//               }
//             );
//             this.setState({
//               images: [...images, ...imagesData],
//               hasMoreImages: page < totalPages,
//             });
//             notifications(hits, page, totalHits);
//           })
//           .catch(error => this.setState({ error }))
//           .finally(() => this.setState({ isLoading: false }));

//     }
//   }
//   loadMoreImages = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };
//   openModal = picture => {
//     this.setState({ largeImageURL: picture });
//     console.log(picture);
//   };
//   closeModal = () => {
//     this.setState({ largeImageURL: null });
//   };

//   handleSubmit = query => {
//     onEmptyNotification(query);
//     this.setState({ query: query });
//     if (query !== this.state.query) {
//       this.setState({
//         images: [],
//         page: 1,
//       });
//     }
//   };

//   render() {
//     const { isLoading, images, largeImageURL, hasMoreImages } = this.state;

//     return (
//       <Container>
//         <SearchBar onSubmit={this.handleSubmit} />
//         {isLoading && <Loader />}
//         {images.length > 0 && (
//           <ImageGallery onClick={this.openModal} images={images} />
//         )}
//         {images.length > 0 && hasMoreImages && (
//           <LoadMoreBtn loadMore={this.loadMoreImages} />
//         )}
//         {largeImageURL && (
//           <Modal onCloseModal={this.closeModal} picture={largeImageURL} />
//         )}
//         <ToastContainer autoClose={3000} />
//       </Container>
//     );
//   }
// }
// export default App;
