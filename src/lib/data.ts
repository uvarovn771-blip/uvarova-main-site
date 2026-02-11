import type { Article } from './types';

export const articles: Article[] = [
  {
    slug: 'the-first-50-words',
    title: 'The First 50 Words: A Guide for Parents',
    description: 'Understand the milestones of early language development and how you can encourage your child to start talking.',
    category: 'Speech Launch',
    author: 'Dr. Evelyn Reed',
    publishedAt: '2024-05-15T09:00:00Z',
    image: { id: 'article-1' },
    content: `Starting the journey of speech can be both exciting and nerve-wracking for parents. The first 50 words are a significant milestone, typically occurring between 18 to 24 months. This period marks a "word explosion" where children rapidly expand their vocabulary.\n\nTo support this growth, focus on everyday interactions. Narrate your day, label objects around the house, and respond enthusiastically to your child's attempts at communication, even if they're just babbles. Reading simple, repetitive books daily is another powerful tool to introduce new words in a fun and engaging way.`
  },
  {
    slug: 'fun-articulation-exercises',
    title: 'Fun Articulation Exercises to Do at Home',
    description: 'Turn speech practice into playtime with these engaging and effective articulation exercises for young children.',
    category: 'Exercises',
    author: 'Mark Chen, SLP',
    publishedAt: '2024-05-20T11:30:00Z',
    image: { id: 'article-2' },
    content: `Articulation is the clear and distinct pronunciation of sounds in speech. If your child struggles with certain sounds, turning practice into a game can make all the difference.\n\nTry "sound treasure hunts" where you look for objects around the house that start with a target sound (e.g., 's' for 'sock', 'sun', 'spoon'). Another great activity is using mirrors to make silly faces while practicing sounds like 'ooo' and 'eee'. This helps children see how their mouth moves to create different sounds. Remember to keep it light, fun, and pressure-free.`
  },
  {
    slug: 'reducing-toddler-frustration',
    title: 'When Words Wont Come: Reducing Toddler Frustration',
    description: 'Learn strategies to help your toddler communicate their needs and reduce frustration when they struggle with words.',
    category: 'Parenting Tips',
    author: 'Dr. Evelyn Reed',
    publishedAt: '2024-05-25T14:00:00Z',
    image: { id: 'article-3' },
    content: `It's common for toddlers to feel frustrated when they can't express their wants and needs. This communication gap can lead to tantrums and stress for both child and parent.\n\nOne effective strategy is to introduce simple sign language for key words like "more," "all done," and "help." This gives them a way to communicate before they have the verbal skills. Also, validate their feelings by saying, "It's so frustrating when I don't understand what you want. Can you show me?" This empathy can defuse the situation and strengthen your bond.`
  },
  {
    slug: 'how-to-choose-a-speech-therapist',
    title: 'How to Choose the Right Speech Therapist for Your Child',
    description: 'A practical guide to finding a qualified and compatible speech-language pathologist (SLP) for your family.',
    category: 'Parenting Tips',
    author: 'Laura Santos',
    publishedAt: '2024-06-01T10:00:00Z',
    image: { id: 'article-4' },
    content: `Finding the right speech therapist is a crucial step in your child's development journey. Start by looking for a certified Speech-Language Pathologist (SLP) with experience in pediatrics and your child's specific challenges.\n\nDuring an initial consultation, ask about their therapy approach, how they involve parents, and what progress might look like. Most importantly, observe how they interact with your child. A good therapist will build a positive, playful rapport, making therapy a place your child wants to be.`
  },
  {
    slug: 'the-power-of-play-in-speech-therapy',
    title: 'The Power of Play in Speech Therapy',
    description: 'Discover how play-based therapy helps children learn and practice communication skills in a natural, motivating environment.',
    category: 'Speech Launch',
    author: 'Mark Chen, SLP',
    publishedAt: '2024-06-05T16:20:00Z',
    image: { id: 'article-5' },
    content: `For children, play is serious work. It's how they learn about the world, and it's one of the most effective tools in speech therapy. Play-based therapy embeds communication goals into activities the child already loves.\n\nInstead of drilling flashcards, a therapist might practice turn-taking and vocabulary while playing with a toy farm ("My turn for the cow! The cow says 'moo'!"). This natural context helps children generalize skills to their everyday life and fosters a genuine love for communication.`
  },
  {
    slug: 'making-sounds-visual',
    title: 'Making Sounds Visual: Tips for Tricky Pronunciations',
    description: 'Explore techniques that use visual and tactile cues to help children master difficult sounds like "R," "L," and "TH".',
    category: 'Exercises',
    author: 'Dr. Evelyn Reed',
    publishedAt: '2024-06-10T09:45:00Z',
    image: { id: 'article-6' },
    content: `Some sounds are harder to learn because the tongue and lip movements are less visible. For these tricky sounds, making them visual can be a breakthrough.\n\nFor the 'L' sound, use a dab of peanut butter or a lollipop on the spot behind the top teeth to show the child where their tongue should go. For 'TH', practice by sticking the tongue out slightly between the teeth while looking in a mirror. These multi-sensory approaches connect the physical action to the sound, making it easier for children to understand and replicate.`
  },
];

export const categories = [...new Set(articles.map(a => a.category))];
