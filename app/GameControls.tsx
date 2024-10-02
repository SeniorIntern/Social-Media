'use client';

import useGameStore from '@/app/store/gameStore';

import RestartGame from './RestartGame';

const GameControls = () => {
  const totalUniqueCards = 9;
  const { pairs } = useGameStore();

  return (
    <div className="my-4 w-full px-8 lg:fixed lg:top-20 lg:m-0">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold uppercase italic">
          SCORE: {`${pairs.length}/${totalUniqueCards}`}
        </span>
        <RestartGame />
      </div>
    </div>
  );
};

export default GameControls;
