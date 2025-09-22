import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search applications, shortcuts..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md sm:max-w-2xl mx-auto">
      <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 sm:pl-12 pr-4 py-3 sm:py-6 text-base sm:text-lg bg-search border-search-border focus:border-search-focus focus:ring-search-focus rounded-xl transition-all duration-300"
      />
    </div>
  );
}