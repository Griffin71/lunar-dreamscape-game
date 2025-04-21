
import { LeaderboardEntry } from "@/types";

// Mock leaderboard data
export const leaderboardEntries: LeaderboardEntry[] = [
  {
    userId: "user-001",
    username: "luna_player",
    avatar: "/avatars/avatar-1.png",
    gameId: "luna-dash",
    score: 2500,
    timestamp: new Date("2023-04-15T14:22:18")
  },
  {
    userId: "user-002",
    username: "cosmic_explorer",
    avatar: "/avatars/avatar-2.png",
    gameId: "luna-dash",
    score: 2850,
    timestamp: new Date("2023-04-14T19:15:32")
  },
  {
    userId: "user-003",
    username: "star_chaser",
    avatar: "/avatars/avatar-3.png",
    gameId: "luna-dash",
    score: 3200,
    timestamp: new Date("2023-04-16T09:45:12")
  },
  {
    userId: "user-004",
    username: "moon_wanderer",
    avatar: "/avatars/avatar-4.png",
    gameId: "luna-dash",
    score: 1950,
    timestamp: new Date("2023-04-13T22:30:45")
  },
  {
    userId: "user-005",
    username: "nebula_dreamer",
    avatar: "/avatars/avatar-5.png",
    gameId: "luna-dash",
    score: 2750,
    timestamp: new Date("2023-04-15T11:10:28")
  },
  {
    userId: "user-001",
    username: "luna_player",
    avatar: "/avatars/avatar-1.png",
    gameId: "lunas-light",
    score: 1800,
    timestamp: new Date("2023-04-12T16:40:22")
  },
  {
    userId: "user-002",
    username: "cosmic_explorer",
    avatar: "/avatars/avatar-2.png",
    gameId: "lunas-light",
    score: 1950,
    timestamp: new Date("2023-04-11T13:25:47")
  },
  {
    userId: "user-003",
    username: "star_chaser",
    avatar: "/avatars/avatar-3.png",
    gameId: "shadowbound",
    score: 850,
    timestamp: new Date("2023-04-14T15:55:39")
  },
  {
    userId: "user-001",
    username: "luna_player",
    avatar: "/avatars/avatar-1.png",
    gameId: "shadowbound",
    score: 750,
    timestamp: new Date("2023-04-13T18:20:15")
  }
];

export const getLeaderboardByGame = (gameId: string): LeaderboardEntry[] => {
  return leaderboardEntries
    .filter(entry => entry.gameId === gameId)
    .sort((a, b) => b.score - a.score);
};

export const getUserHighScore = (userId: string, gameId: string): number | null => {
  const userEntries = leaderboardEntries.filter(
    entry => entry.userId === userId && entry.gameId === gameId
  );
  
  if (userEntries.length === 0) {
    return null;
  }
  
  // Return the highest score
  return Math.max(...userEntries.map(entry => entry.score));
};

export const addLeaderboardEntry = (entry: LeaderboardEntry): void => {
  // In a real app, this would make an API request
  leaderboardEntries.push(entry);
};

export const getTopPlayers = (limit: number = 5): LeaderboardEntry[] => {
  // Create a map to store the highest score for each user across all games
  const userBestScores: Record<string, LeaderboardEntry> = {};
  
  leaderboardEntries.forEach(entry => {
    if (!userBestScores[entry.userId] || entry.score > userBestScores[entry.userId].score) {
      userBestScores[entry.userId] = entry;
    }
  });
  
  // Convert the map to array and sort by score
  return Object.values(userBestScores)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
