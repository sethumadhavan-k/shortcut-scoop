import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ApplicationCard } from "@/components/ApplicationCard";
import { GitHubButton } from "@/components/GitHubButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { applications, categories, getCategoryById } from "@/data/shortcuts";
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
          getCategoryById(app.categoryId)?.name.toLowerCase().includes(query) ||
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
      filtered = filtered.filter((app) => app.categoryId === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-light text-primary">
              <Keyboard className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="hidden xs:block">ShortKeys</span>
              <span className="xs:hidden">SK</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <GitHubButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Master Every Shortcut
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Discover keyboard shortcuts for your favorite applications. 
            Boost your productivity with comprehensive shortcut references.
          </p>
          
          <div className="max-w-md mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search apps, shortcuts..."
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="cursor-pointer transition-colors hover:bg-primary-hover text-xs sm:text-sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className="cursor-pointer transition-colors hover:bg-primary-hover text-xs sm:text-sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="container mx-auto">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-light mb-2">No applications found</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Try adjusting your search query or selected category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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