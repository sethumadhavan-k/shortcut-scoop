import { cn } from "@/lib/utils";

interface KeyboardKeyProps {
  children: React.ReactNode;
  className?: string;
}

export function KeyboardKey({ children, className }: KeyboardKeyProps) {
  return (
    <kbd 
      className={cn(
        "inline-flex items-center justify-center min-w-8 h-8 px-2 text-sm font-medium rounded-md",
        "bg-key text-key-foreground border border-key-border",
        "shadow-sm transition-colors",
        className
      )}
    >
      {children}
    </kbd>
  );
}

interface KeyCombinationProps {
  keys: string[];
  className?: string;
}

export function KeyCombination({ keys, className }: KeyCombinationProps) {
  return (
    <div className={cn("flex items-center gap-1 font-mono", className)}>
      {keys.map((key, index) => (
        <div key={index} className="flex items-center gap-1">
          <KeyboardKey>{key}</KeyboardKey>
          {index < keys.length - 1 && (
            <span className="text-muted-foreground text-xs">+</span>
          )}
        </div>
      ))}
    </div>
  );
}