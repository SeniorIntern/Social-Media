'use client';

import CardContainer from '@/app/CardContainer';
import { Gif } from '@/app/types';
import { useGifs } from '@/hooks';

import GameControls from './GameControls';

export default function Page() {
  const { data: res, isLoading, error } = useGifs();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const gifs = res?.data;
  if (!gifs) return <></>;

  // make pair of each element
  const duplicatedGifs = [...gifs, ...gifs];

  // Shuffle gifs
  const shuffleArray = (array: Gif[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  shuffleArray(duplicatedGifs);

  return (
    <>
      <GameControls />
      <CardContainer gifs={duplicatedGifs} />
    </>
  );
}
