import axios from "axios";
import { useQuery } from "react-query";

const HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWNjMTU4NmE5ODMwN2VlZTk1ZWYxYWFjOTExNDU0NiIsInN1YiI6IjY0NmU5ODc3ZWEzOTQ5MDBhN2NmY2I1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7X61NhwhmlAW54YCm34BeCfSvWHOu-cZDA0m6UO77cA",
};

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  page: number;
  results: MovieDetail[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export const usePopularMovies = (search: string, page: number) => {
  return useQuery(
    ["popular_movie", search, page],
    async (): Promise<MovieList> => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          headers: HEADERS,
        }
      );
      return data;
    },
    {
      enabled: !search,
    }
  );
};

export const useSearchMovies = (search: string, page: number) => {
  return useQuery(
    ["search_movie", search, page],
    async (): Promise<MovieList> => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`,
        {
          headers: HEADERS,
        }
      );
      return data;
    },
    {
      enabled: !!search,
    }
  );
};

export const useGenresMovies = () => {
  return useQuery("genres_movie", async (): Promise<Genres | undefined> => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        headers: HEADERS,
      }
    );
    return data;
  });
};
