import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Activity, 
  Clock, 
  Calendar, 
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { getPriorityColor, getPriorityLabel } from '@/utils/scheduler';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.priority - a.priority;
  });

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Tasks</span>
          <Badge variant="secondary">
            {tasks.filter(t => !t.completed).length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {sortedTasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tasks added yet. Start by adding a new task above.
              </p>
            ) : (
              sortedTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all ${
                    task.completed 
                      ? 'bg-muted/50 opacity-60 border-border/50' 
                      : task.type === 'academic'
                        ? 'bg-academic/5 border-academic/20 hover:border-academic/40'
                        : 'bg-extracurricular/5 border-extracurricular/20 hover:border-extracurricular/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleComplete(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {task.type === 'academic' ? (
                              <BookOpen className="h-4 w-4 text-academic" />
                            ) : (
                              <Activity className="h-4 w-4 text-extracurricular" />
                            )}
                            <h4 className={font-medium ${task.completed ? 'line-through' : ''}}>
                              {task.name}
                            </h4>
                            {task.completed && (
                              <CheckCircle className="h-4 w-4 text-accent" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.type === 'academic' 
                              ? ${task.subject} • ${task.credits} credits
                              : task.activity
                            }
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteTask(task.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <Badge 
                          variant="outline" 
                          className={bg-${getPriorityColor(task.priority)}/10 border-${getPriorityColor(task.priority)}/50}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {task.hoursRequired}h
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(task.deadline, 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}