const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'Tj-Ibog63A5CLWSYTiYkR2ZJsHj70wgWJUjcrbLwQw4';

interface UnsplashApiResponse {
  results: Array<{
    id: string;
    urls: { regular: string; small: string };
    alt_description: string | null;
  }>;
}

export const fetchImages = async (query: string, page: number): Promise<UnsplashApiResponse> => {
  const response = await fetch(
    `${UNSPLASH_API_URL}?query=${query}&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  const data: UnsplashApiResponse = await response.json();
  return data;
};