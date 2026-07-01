export interface User{
  clerkId: string;
  fullName: string;
  imageUrl: string;
};

export interface Song{
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId : string | null;
  createdAt: string;
  updatedAt: string;
};

export interface Album{
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs : Song[]
  createdAt: string;
  updatedAt: string;
};

export interface Stats{
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalUsers: number;
}