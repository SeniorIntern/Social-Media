'use client';

import useGameStore from '@/app/store/gameStore';
import { Gif } from '@/app/types';
import { TOAST_KEY_ANNOUNCE } from '@/constants';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'sonner';

import QuestionMark from './QuestionMark.png';

type Props = {
  gifs: Gif[];
};

type CardSelection = {
  gifId: string;
  mapId: number;
};

const CardContainer = ({ gifs }: Props) => {
  console.log('mounted');

  const totalUniqueCards = 9;

  const { width, height } = useWindowSize();
  const { pairs, setPairs } = useGameStore();
  const [confettiTotal, setConfettiTotal] = useState(100);
  const [selections, setSelections] = useState<CardSelection[]>([]);

  const router = useRouter();
  const { restart } = useGameStore();

  useEffect(() => {
    if (selections.length === 2) {
      if (selections[0].mapId === selections[1].mapId) {
        setSelections([]);
        return;
      }

      if (selections[0].gifId === selections[1].gifId) {
        setPairs(selections[0].gifId);
      }

      setTimeout(() => {
        setSelections([]);
      }, 750);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, confettiTotal]);

  const isSelected = (mapId: number): boolean => {
    for (let i = 0; i < selections.length; i++) {
      if (selections[i].mapId === mapId) return true;
    }
    return false;
  };

  if (pairs.length === totalUniqueCards && confettiTotal !== 0) {
    toast.success('Congratulations! You have won the game', {
      id: TOAST_KEY_ANNOUNCE
    });

    setTimeout(() => {
      toast.success('Restarting the game...', {
        id: TOAST_KEY_ANNOUNCE,
        duration: 1000
      });
    }, 3000);

    setTimeout(() => {
      setConfettiTotal(0);
      restart();
      router.refresh();
    }, 5000);
  }

  return (
    <section className="flex grow items-center justify-center">
      {pairs.length === totalUniqueCards && (
        <Confetti
          numberOfPieces={confettiTotal}
          width={width || 200}
          height={height || 200}
        />
      )}
      <div className="scale-up-center grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-10 lg:grid-cols-6">
        {gifs.map((gif, index) => (
          <div
            className="relative h-32 w-32 transform cursor-pointer overflow-hidden rounded-2xl border-2 border-black transition-transform duration-300 hover:scale-110 hover:border-white"
            onClick={() =>
              setSelections([...selections, { gifId: gif.id, mapId: index }])
            }
            key={index}
          >
            <Image
              src={gif.images.original.url}
              alt="Gif image"
              fill
              unoptimized
              style={{
                objectFit: 'contain',
                display:
                  pairs.includes(gif.id) || isSelected(index) ? 'block' : 'none'
              }}
              className="absolute rounded-md"
            />
            {!pairs.includes(gif.id) && !isSelected(index) && (
              <Image
                src={QuestionMark}
                alt="GIF"
                style={{
                  display: 'block'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardContainer;
