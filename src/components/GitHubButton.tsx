import { useState, useEffect } from "react";
import { Star, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubStats {
  stars: number;
  loading: boolean;
}

export function GitHubButton() {
  const [stats, setStats] = useState<GitHubStats>({ stars: 0, loading: true });
  const repoUrl = "https://github.com/lovable-dev/shortcut-scoop"; // Update with actual repo

  useEffect(() => {
    // Mock GitHub API call - replace with actual API call when repo exists
    const fetchGitHubStats = async () => {
      try {
        // Simulated API response
        setTimeout(() => {
          setStats({ stars: 42, loading: false });
        }, 1000);
      } catch (error) {
        setStats({ stars: 0, loading: false });
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
        onClick={() => window.open(repoUrl, '_blank')}
      >
        <Github className="w-4 h-4" />
        <span className="hidden sm:inline">GitHub</span>
        <span className="sm:hidden">GitHub</span>
      </Button>
      
      {!stats.loading && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground bg-background/30 backdrop-blur-sm rounded-md px-2 py-1 border border-border">
          <Star className="w-3 h-3 fill-current" />
          {stats.stars}
        </div>
      )}
    </div>
  );
}