import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../components/ImageModal/ImageModal';

interface Image {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
  };
  views?: number; // Добавление поля views с возможностью отсутствия
  description?: string; // Добавление поля description с возможностью отсутствия
}

interface ApiResponse {
  results: Image[];
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
        const data: ApiResponse = await response.json(); // Определение типа данных ApiResponse для ответа от API
        setImages((prevImages) => {
          if (page === 1) {
            return data.results.map((image) => ({
              ...image,
              views: 0, // Добавление поля views
              description: image.alt_description,
            }));
          } else {
            return [...prevImages, ...data.results.map((image) => ({
              ...image,
              views: 0, // Добавление поля views
              description: image.alt_description,
            }))];
          }
        });
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
          views={(images.find((image) => image.urls.regular === selectedImage)?.views) || 0} // Использование условного оператора для получения значения views
          description={(images.find((image) => image.urls.regular === selectedImage)?.description) || ''} // Использование условного оператора для получения значения description
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
