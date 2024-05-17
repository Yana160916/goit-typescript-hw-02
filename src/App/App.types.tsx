export interface Image {
  id: string;
  urls: { regular: string };
  alt_description: string | null;
  views: number;
  description: string | null;
}