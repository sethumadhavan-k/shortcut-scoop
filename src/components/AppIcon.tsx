import { Application, getDefaultIcon, getCategoryById } from "@/data/shortcuts";

interface AppIconProps {
  application: Application;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 text-lg",
  md: "w-8 h-8 text-2xl",
  lg: "w-12 h-12 text-4xl",
  xl: "w-16 h-16 text-6xl"
};

export function AppIcon({ application, size = "md", className = "" }: AppIconProps) {
  const category = getCategoryById(application.categoryId);
  const fallbackIcon = application.icon || getDefaultIcon(application.categoryId);
  
  if (application.icon_url) {
    return (
      <div className={`${sizeClasses[size]} ${className} rounded-lg overflow-hidden bg-muted flex items-center justify-center`}>
        <img
          src={application.icon_url}
          alt={`${application.name} icon`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = fallbackIcon;
              parent.className = parent.className.replace('bg-muted', '');
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      {fallbackIcon}
    </div>
  );
}