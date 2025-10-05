import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  TrendingUp,
  Target,
  Brain
} from 'lucide-react';
import { Suggestion } from '@/types/task';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
}

export function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  const getIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getVariant = (type: Suggestion['type']): "default" | "destructive" => {
    switch (type) {
      case 'warning':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getActionIcon = (action?: string) => {
    if (!action) return null;
    if (action.includes('Focus')) return <Target className="h-3 w-3" />;
    if (action.includes('Explore') || action.includes('Consider')) return <TrendingUp className="h-3 w-3" />;
    if (action.includes('Keep')) return <CheckCircle className="h-3 w-3" />;
    return <Brain className="h-3 w-3" />;
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Add tasks to receive personalized suggestions
          </p>
        ) : (
          suggestions.map((suggestion, index) => (
            <Alert key={index} variant={getVariant(suggestion.type)} className="transition-all hover:shadow-md">
              <div className="flex items-start gap-2">
                {getIcon(suggestion.type)}
                <div className="flex-1">
                  <AlertTitle className="mb-1">{suggestion.title}</AlertTitle>
                  <AlertDescription>{suggestion.message}</AlertDescription>
                  {suggestion.action && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium">
                      {getActionIcon(suggestion.action)}
                      <span>{suggestion.action}</span>
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
}