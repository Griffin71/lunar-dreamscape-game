
import { useAuth } from "@/contexts/AuthContext";
import { getTopPlayers } from "@/data/leaderboards";
import { games, getGameImage } from "@/data/games";
import { Navigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const topPlayers = getTopPlayers(5);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen starry-bg flex flex-col">
      {/* Header with user info */}
      <header className="bg-cosmic-900/80 backdrop-blur-md text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold text-cosmic-100">
            Plug and Play
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-cosmic-400 overflow-hidden">
                {user?.avatar && <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />}
              </div>
              <span className="font-medium">{user?.username}</span>
            </div>
            <Button
              variant="outline"
              className="border-cosmic-300 text-cosmic-100 hover:bg-cosmic-800"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.username}!</h1>

        {/* Featured Games */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link to={`/games/${game.id}`} key={game.id}>
                <Card className={`cosmic-card h-full hover:-translate-y-1 transition-transform ${game.colorTheme}`}>
                  <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
                    <img 
                      src={getGameImage(game.id)} 
                      alt={game.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-cosmic-900/70 text-white text-xs py-1 px-2 rounded-full">
                      {game.mood}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{game.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{game.gameplay}</p>
                    <p className="text-xs line-clamp-2">{game.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Players</h2>
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-4">Game</div>
              <div className="col-span-3 text-right">Score</div>
            </div>
            {topPlayers.map((entry, index) => (
              <div key={`${entry.userId}-${entry.gameId}`} className="grid grid-cols-12 p-4 border-t border-border items-center">
                <div className="col-span-1 text-center font-bold">{index + 1}</div>
                <div className="col-span-4 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-cosmic-100 overflow-hidden">
                    {entry.avatar && <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />}
                  </div>
                  <span>{entry.username}</span>
                </div>
                <div className="col-span-4">
                  {games.find(game => game.id === entry.gameId)?.title || entry.gameId}
                </div>
                <div className="col-span-3 text-right font-mono font-bold">{entry.score.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
