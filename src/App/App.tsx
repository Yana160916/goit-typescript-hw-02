import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import ImageGallery from '../components/ImageGallery/ImageGallery.tsx';
import Loader from '../components/Loader/Loader.tsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.tsx';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn.tsx';
import ImageModal from '../components/ImageModal/ImageModal.tsx';
import { Image } from './App.types.tsx';

interface UnsplashApiResponse {
  results: Array<{
    id: string;
    urls: { regular: string };
    alt_description: string | null;
  }>;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=Tj-Ibog63A5CLWSYTiYkR2ZJsHj70wgWJUjcrbLwQw4`
        );
        const data: UnsplashApiResponse = await response.json();
        const newImages = data.results.map((image) => ({
          ...image,
          views: 0,
          description: image.alt_description,
        }));
        setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
      } catch (error) {
        setError('Error fetching images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (query !== '') {
      fetchImages();
    }
  }, [query, page]);

  const handleSearchSubmit = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          imageUrl={selectedImage}
          views={images.find((image) => image.urls.regular === selectedImage)?.views ?? 0}
          description={images.find((image) => image.urls.regular === selectedImage)?.description ?? ''}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;