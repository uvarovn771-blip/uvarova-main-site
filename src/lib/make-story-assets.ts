
export type StoryStep = {
  id: string;
  img: string;
  order: number;
};

export type StoryLevel = {
  id: number;
  folder: string;
  steps: StoryStep[];
};

export const storyLevels: StoryLevel[] = [
  {
    id: 1,
    folder: 'growing_flower',
    steps: [
      { id: 's1_1', img: '/MakestoryGame/1_1.jpg', order: 1 }, // Семечко в земле
      { id: 's1_2', img: '/MakestoryGame/1_2.jpg', order: 2 }, // Росток
      { id: 's1_3', img: '/MakestoryGame/1_3.jpg', order: 3 }, // Бутон
      { id: 's1_4', img: '/MakestoryGame/1_4.jpg', order: 4 }  // Цветок
    ]
  },
  {
    id: 2,
    folder: 'building_tower',
    steps: [
      { id: 's2_1', img: '/MakestoryGame/2_1.jpg', order: 1 },
      { id: 's2_2', img: '/MakestoryGame/2_2.jpg', order: 2 },
      { id: 's2_3', img: '/MakestoryGame/2_3.jpg', order: 3 },
      { id: 's2_4', img: '/MakestoryGame/2_4.jpg', order: 4 }
    ]
  },
  {
    id: 3,
    folder: 'apple_lifecycle',
    steps: [
      { id: 's3_1', img: '/MakestoryGame/3_1.jpg', order: 1 },
      { id: 's3_2', img: '/MakestoryGame/3_2.jpg', order: 2 },
      { id: 's3_3', img: '/MakestoryGame/3_3.jpg', order: 3 },
      { id: 's3_4', img: '/MakestoryGame/3_4.jpg', order: 4 }
    ]
  },
  {
    id: 4,
    folder: 'snowman',
    steps: [
      { id: 's4_1', img: '/MakestoryGame/4_1.jpg', order: 1 },
      { id: 's4_2', img: '/MakestoryGame/4_2.jpg', order: 2 },
      { id: 's4_3', img: '/MakestoryGame/4_3.jpg', order: 3 },
      { id: 's4_4', img: '/MakestoryGame/4_4.jpg', order: 4 }
    ]
  }
];
