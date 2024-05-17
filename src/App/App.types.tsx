export interface Image {
  id: string;
  urls: { regular: string; small: string };
  alt_description: string | null;
  views: number;
  description: string | null;
}