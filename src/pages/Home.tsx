import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Badge } from "@/components/ui/badge";
import { applications, categories } from "@/data/shortcuts";
import { Keyboard } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredApplications = useMemo(() => {
    let filtered = applications;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.description.toLowerCase().includes(query) ||
          app.category.toLowerCase().includes(query) ||
          app.shortcuts.some(group => 
            group.title.toLowerCase().includes(query) ||
            group.shortcuts.some(shortcut => 
              shortcut.description.toLowerCase().includes(query) ||
              shortcut.keys.some(key => key.toLowerCase().includes(query))
            )
          )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((app) => app.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-primary">
            <Keyboard className="w-8 h-8" />
            ShortKeys
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Master Every Shortcut
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover keyboard shortcuts for your favorite applications. 
            Boost your productivity with comprehensive shortcut references.
          </p>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search applications, shortcuts, or keys..."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="cursor-pointer transition-colors hover:bg-primary-hover"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer transition-colors hover:bg-primary-hover"
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No applications found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or selected category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}