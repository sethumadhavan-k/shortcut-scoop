import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Copy, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KeyCombination } from "@/components/ui/keyboard-key";
import { AppIcon } from "@/components/AppIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { applications, getCategoryById } from "@/data/shortcuts";
import { toast } from "@/hooks/use-toast";

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const application = applications.find((app) => app.id === id);

  if (!application) {
    return <Navigate to="/404" replace />;
  }

  const category = getCategoryById(application.categoryId);

  const copyShortcut = (keys: string[], description: string) => {
    const shortcutText = `${keys.join(" + ")}: ${description}`;
    navigator.clipboard.writeText(shortcutText);
    toast({
      title: "Copied to clipboard",
      description: shortcutText,
    });
  };

  const totalShortcuts = application.shortcuts.reduce(
    (sum, group) => sum + group.shortcuts.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back to apps</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open("https://github.com/lovable-dev/shortcut-scoop", '_blank')}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Application Header */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-hero border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
            <AppIcon application={application} size="xl" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-2 sm:mb-3">
                {application.name}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-3 sm:mb-4">
                {application.description}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <Badge className="bg-category text-category-foreground text-xs sm:text-sm">
                  <span className="mr-1">{category?.icon}</span>
                  {category?.name || 'Other'}
                </Badge>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {totalShortcuts} shortcuts available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shortcuts Content */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            {application.shortcuts.map((group, groupIndex) => (
              <Card key={groupIndex} className="bg-card border-border">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-card-foreground">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {group.shortcuts.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-3 sm:px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group gap-2 sm:gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-card-foreground font-light mb-1 text-sm sm:text-base">
                            {shortcut.description}
                          </p>
                          {shortcut.note && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {shortcut.note}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                          <KeyCombination keys={shortcut.keys} />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => copyShortcut(shortcut.keys, shortcut.description)}
                          >
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}