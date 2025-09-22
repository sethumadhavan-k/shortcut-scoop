import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Keyboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="text-8xl">🔍</div>
        <div className="space-y-3">
          <h1 className="text-4xl font-light text-foreground">404</h1>
          <p className="text-xl text-muted-foreground">
            Oops! This shortcut doesn't exist
          </p>
          <p className="text-muted-foreground">
            The page you're looking for cannot be found.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" className="gap-2">
              <Keyboard className="w-4 h-4" />
              Browse Shortcuts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
