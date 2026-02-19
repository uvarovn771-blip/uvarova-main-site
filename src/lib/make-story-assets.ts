
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
      { id: 's1_1', img: '/MakestoryGame/1_1.jpg', order: 1 },
      { id: 's1_2', img: '/MakestoryGame/1_2.jpg', order: 2 },
      { id: 's1_3', img: '/MakestoryGame/1_3.jpg', order: 3 },
      { id: 's1_4', img: '/MakestoryGame/1_4.jpg', order: 4 }
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
  },
  {
    id: 5,
    folder: 'butterfly_lifecycle',
    steps: [
      { id: 's5_1', img: '/MakestoryGame/5_1.jpg', order: 1 },
      { id: 's5_2', img: '/MakestoryGame/5_2.jpg', order: 2 },
      { id: 's5_3', img: '/MakestoryGame/5_3.jpg', order: 3 },
      { id: 's5_4', img: '/MakestoryGame/5_4.jpg', order: 4 }
    ]
  },
  {
    id: 6,
    folder: 'painting_picture',
    steps: [
      { id: 's6_1', img: '/MakestoryGame/6_1.jpg', order: 1 },
      { id: 's6_2', img: '/MakestoryGame/6_2.jpg', order: 2 },
      { id: 's6_3', img: '/MakestoryGame/6_3.jpg', order: 3 },
      { id: 's6_4', img: '/MakestoryGame/6_4.jpg', order: 4 }
    ]
  },
  {
    id: 7,
    folder: 'making_breakfast',
    steps: [
      { id: 's7_1', img: '/MakestoryGame/7_1.jpg', order: 1 },
      { id: 's7_2', img: '/MakestoryGame/7_2.jpg', order: 2 },
      { id: 's7_3', img: '/MakestoryGame/7_3.jpg', order: 3 },
      { id: 's7_4', img: '/MakestoryGame/7_4.jpg', order: 4 }
    ]
  },
  {
    id: 8,
    folder: 'washing_hands',
    steps: [
      { id: 's8_1', img: '/MakestoryGame/8_1.jpg', order: 1 },
      { id: 's8_2', img: '/MakestoryGame/8_2.jpg', order: 2 },
      { id: 's8_3', img: '/MakestoryGame/8_3.jpg', order: 3 },
      { id: 's8_4', img: '/MakestoryGame/8_4.jpg', order: 4 }
    ]
  },
  {
    id: 9,
    folder: 'birthday_gift',
    steps: [
      { id: 's9_1', img: '/MakestoryGame/9_1.jpg', order: 1 },
      { id: 's9_2', img: '/MakestoryGame/9_2.jpg', order: 2 },
      { id: 's9_3', img: '/MakestoryGame/9_3.jpg', order: 3 },
      { id: 's9_4', img: '/MakestoryGame/9_4.jpg', order: 4 }
    ]
  },
  {
    id: 10,
    folder: 'building_house',
    steps: [
      { id: 's10_1', img: '/MakestoryGame/10_1.jpg', order: 1 },
      { id: 's10_2', img: '/MakestoryGame/10_2.jpg', order: 2 },
      { id: 's10_3', img: '/MakestoryGame/10_3.jpg', order: 3 },
      { id: 's10_4', img: '/MakestoryGame/10_4.jpg', order: 4 }
    ]
  }
];
