
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getGameById, getGameImage } from "@/data/games";
import { getLeaderboardByGame } from "@/data/leaderboards";
import { Button } from "@/components/ui/button";

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  const game = id ? getGameById(id) : null;
  
  if (!game) {
    return <Navigate to="/dashboard" />;
  }
  
  const leaderboard = getLeaderboardByGame(game.id);
  
  return (
    <div className={`min-h-screen ${game.colorTheme}`}>
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
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
              <Button className="cosmic-button-primary w-full">
                Play Now
              </Button>
            </div>
          </div>
          
          {/* Leaderboard */}
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
                              {entry.avatar && <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />}
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
