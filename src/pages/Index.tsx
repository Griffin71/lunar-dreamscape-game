
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { games, getGameImage } from "@/data/games";
import { Heart, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col starry-bg">
      {/* Hero Section */}
      <section className="py-20 px-4 flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <Heart className="h-16 w-16 text-cosmic-500" />
            <Sparkles className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 via-cosmic-500 to-cosmic-700 bg-clip-text text-transparent">
          For Luna
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          A special game created just for you
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/luna-game">
            <Button className="cosmic-button-primary text-lg px-8 py-6 bg-gradient-to-r from-cosmic-500 to-cosmic-700 hover:from-cosmic-600 hover:to-cosmic-800 group">
              <span>Play Luna's Game</span>
              <Sparkles className="h-5 w-5 ml-2 group-hover:animate-ping" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Game Showcase - Show below but with less emphasis */}
      <section id="games" className="py-16 px-4 bg-gradient-to-b from-background/80 to-cosmic-900/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Experience the Luna Universe</h2>
          <p className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
            Discover a collection of games that take you through different moods and experiences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.slice(0, 6).map((game) => (
              <div key={game.id} className={`cosmic-card group hover:shadow-xl transition-all ${game.colorTheme}`}>
                <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
                  <img 
                    src={getGameImage(game.id)} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/80 to-transparent flex items-end">
                    <div className="p-4">
                      <div className="text-xs inline-block px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                        {game.mood} · {game.gameplay}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{game.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-4">{game.description}</p>
                  <p className="text-xs text-muted-foreground">{game.vibe}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/auth">
              <Button className="cosmic-button-primary">
                Sign Up to Play Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cosmic-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">For Luna</h2>
          <p className="text-cosmic-300 mb-4">A game made with love</p>
          <p className="text-sm text-cosmic-400">
            © {new Date().getFullYear()} Luna's Starlight Collection. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
