
import { Game } from "@/types";

export const games: Game[] = [
  {
    id: "lunas-light",
    title: "Luna's Light",
    description: "Guide Luna through glowing ruins to solve gentle puzzles and restore fragments of the moon.",
    mood: "calm",
    coverImage: "/images/lunas-light.jpg",
    vibe: "Serene, ambient, glowing blues and whites.",
    gameplay: "Puzzle Adventure",
    colorTheme: "bg-gradient-to-br from-blue-300 via-cosmic-100 to-blue-400"
  },
  {
    id: "shadowbound",
    title: "Shadowbound",
    description: "Luna navigates a world shifting between light and dark. Each realm changes the terrain, enemies, and her abilities.",
    mood: "bold",
    coverImage: "/images/shadowbound.jpg",
    vibe: "Dynamic, fast-paced, slightly eerie with beautiful contrasts.",
    gameplay: "Platformer",
    colorTheme: "bg-gradient-to-br from-cosmic-900 via-cosmic-700 to-cosmic-500"
  },
  {
    id: "lunas-garden",
    title: "Luna's Garden",
    description: "Grow a moon-blessed garden. Each plant is tied to a memory or mini-story.",
    mood: "cozy",
    coverImage: "/images/lunas-garden.jpg",
    vibe: "Soothing music, dreamy visuals, relaxing gameplay.",
    gameplay: "Idle Sim",
    colorTheme: "bg-gradient-to-br from-luna-green/40 via-cosmic-100 to-cosmic-200"
  },
  {
    id: "project-luna-astral-rift",
    title: "Project Luna: Astral Rift",
    description: "Explore galactic conflicts and cosmic mysteries as Luna, a peacekeeper traveling between star worlds.",
    mood: "curious",
    coverImage: "/images/astral-rift.jpg",
    vibe: "Deep lore, moral choices, star maps and space puzzles.",
    gameplay: "Sci-Fi RPG / Visual Novel",
    colorTheme: "bg-gradient-to-br from-cosmic-800 via-cosmic-600 to-cosmic-400"
  },
  {
    id: "luna-and-nova",
    title: "Luna & Nova: A Love in Phases",
    description: "Follow Luna's evolving relationship with Nova, a celestial being. Told in chapters based on moon phases.",
    mood: "romantic",
    coverImage: "/images/luna-and-nova.jpg",
    vibe: "Bittersweet, heartwarming, poetic.",
    gameplay: "Love Story Game",
    colorTheme: "bg-gradient-to-br from-luna-pink/40 via-cosmic-300 to-cosmic-200"
  },
  {
    id: "memory-drift",
    title: "Luna: Memory Drift",
    description: "Luna is stuck in a place where memories drift like stars. Match memory fragments to uncover her story.",
    mood: "reflective",
    coverImage: "/images/memory-drift.jpg",
    vibe: "Mystical, quiet, slow-burn storytelling.",
    gameplay: "Mystery Match Game",
    colorTheme: "bg-gradient-to-br from-cosmic-500 via-cosmic-300 to-cosmic-100"
  },
  {
    id: "luna-dash",
    title: "Luna Dash!",
    description: "Fast-paced infinite runner where Luna flies across starlit rooftops collecting light orbs and dodging dream creatures.",
    mood: "playful",
    coverImage: "/images/luna-dash.jpg",
    vibe: "Fun, flashy, energetic. Bonus powers and outfit changes.",
    gameplay: "Casual Runner Game",
    colorTheme: "bg-gradient-to-br from-luna-blue via-cosmic-500 to-luna-orange"
  }
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

// Helper function to get game mocked images
export const getGameImage = (gameId: string): string => {
  // In a real application, these would be actual image paths
  const placeholderImages: Record<string, string> = {
    "lunas-light": "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    "shadowbound": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "lunas-garden": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "project-luna-astral-rift": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "luna-and-nova": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    "memory-drift": "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "luna-dash": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  };
  
  return placeholderImages[gameId] || "https://via.placeholder.com/400x300";
};
