import { GifFetchResponse } from '@/app/types';
import { CACHE_KEY_GIFS, GIF_STALE_TIME } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGifs = () => {
  return useQuery<GifFetchResponse, Error>({
    queryKey: CACHE_KEY_GIFS,
    queryFn: () =>
      axios
        .get<GifFetchResponse>(
          'https://api.giphy.com/v1/gifs/search?api_key=SCz64Y4TAAXxvnjvV6i8CxzGJ6iHi0zq&q=dog&limit=9&rating=g&lang=en&bundle=messaging_non_clips'
        )
        .then((res) => res.data),
    staleTime: GIF_STALE_TIME
  });
};

export default useGifs;
