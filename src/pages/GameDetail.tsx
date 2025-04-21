
import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { games, getGameById, getGameImage } from "@/data/games";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const deviceOptions = [
  { value: "auto", label: "Detect automatically" },
  { value: "mobile", label: "Mobile (touch/tilt controls)" },
  { value: "desktop", label: "Desktop/Laptop (keyboard/mouse)" },
];

const useLeaderboardsForGame = (gameId: string) => {
  // Here you would query from Supabase using react-query, for demo just filter the scoreboard
  // Replace with a real API call if needed
  const { getLeaderboardByGame } = require("@/data/leaderboards");
  return getLeaderboardByGame(gameId);
};

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDevicePrompt, setShowDevicePrompt] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("auto");

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const game = id ? getGameById(id) : null;

  if (!game) {
    return <Navigate to="/dashboard" />;
  }

  // Filter leaderboard by this game only, real users. Replace with Supabase data fetching as needed.
  const leaderboard = useLeaderboardsForGame(game.id);

  // Prompt device type before starting the game
  const handlePlay = () => {
    setShowDevicePrompt(true);
  };

  const handleLaunchGame = () => {
    setShowDevicePrompt(false);
    // TODO: Send selectedDevice info to game logic for control type
    // You might use context, query params, or another way
    // Here just log for debugging
    console.log("Starting game in", selectedDevice, "mode");
    // Launch game here
  };

  return (
    <div className={`min-h-screen ${game.colorTheme}`}>
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-4 flex items-center">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
          {/* Game Header */}
          <div className="cosmic-card mb-8">
            <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
              <img
                src={getGameImage(game.id)}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{game.title}</h1>
                <span className="px-3 py-1 bg-cosmic-100 text-cosmic-800 rounded-full text-sm">
                  {game.mood} mood
                </span>
              </div>
              <p className="text-lg mb-6">{game.description}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Gameplay</h3>
                <p>{game.gameplay}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Vibe</h3>
                <p>{game.vibe}</p>
              </div>
              <Button className="cosmic-button-primary w-full" onClick={handlePlay}>
                Play Now
              </Button>
              {showDevicePrompt && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-card p-6 rounded shadow-lg max-w-xs w-full animate-fade-in">
                    <h3 className="text-lg font-bold mb-3">Choose Device Type</h3>
                    <div className="flex flex-col gap-2 mb-4">
                      {deviceOptions.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="deviceType"
                            value={opt.value}
                            checked={selectedDevice === opt.value}
                            onChange={() => setSelectedDevice(opt.value)}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                    <Button className="w-full mb-2" onClick={handleLaunchGame}>Start Game</Button>
                    <Button className="w-full" variant="outline" onClick={() => setShowDevicePrompt(false)}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game-specific Leaderboard */}
          <div className="cosmic-card p-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            {leaderboard.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Rank</th>
                      <th className="text-left py-2">Player</th>
                      <th className="text-right py-2">Score</th>
                      <th className="text-right py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={`${entry.userId}-${index}`} className="border-b border-border">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-cosmic-100 overflow-hidden">
                              <Avatar>
                                <AvatarImage
                                  src={entry.avatar || "/avatars/avatar-default.png"}
                                  alt={entry.username}
                                />
                              </Avatar>
                            </div>
                            <span>{entry.username}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-mono">{entry.score.toLocaleString()}</td>
                        <td className="text-right py-3 text-sm text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No scores recorded yet. Be the first to play!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
