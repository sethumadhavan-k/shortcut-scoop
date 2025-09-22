import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KeyCombination } from "@/components/ui/keyboard-key";
import { applications } from "@/data/shortcuts";
import { toast } from "@/hooks/use-toast";

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const application = applications.find((app) => app.id === id);

  if (!application) {
    return <Navigate to="/404" replace />;
  }

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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to apps
            </Link>
            
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Application Header */}
      <section className="py-12 px-6 bg-gradient-hero border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl">{application.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                {application.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {application.description}
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-category text-category-foreground">
                  {application.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {totalShortcuts} shortcuts available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shortcuts Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {application.shortcuts.map((group, groupIndex) => (
              <Card key={groupIndex} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.shortcuts.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0 mr-4">
                          <p className="text-card-foreground font-medium mb-1">
                            {shortcut.description}
                          </p>
                          {shortcut.note && (
                            <p className="text-sm text-muted-foreground">
                              {shortcut.note}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <KeyCombination keys={shortcut.keys} />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyShortcut(shortcut.keys, shortcut.description)}
                          >
                            <Copy className="w-4 h-4" />
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