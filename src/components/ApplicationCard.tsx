import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/data/shortcuts";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const totalShortcuts = application.shortcuts.reduce(
    (sum, group) => sum + group.shortcuts.length,
    0
  );

  return (
    <Link to={`/app/${application.id}`} className="group">
      <Card className="h-full bg-gradient-card hover:bg-card-hover border-border transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{application.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-card-foreground mb-1 group-hover:text-primary transition-colors">
                {application.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {application.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className="bg-category text-category-foreground hover:bg-category"
            >
              {application.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {totalShortcuts} shortcuts
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}