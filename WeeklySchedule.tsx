import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock } from 'lucide-react';
import { ScheduleEntry } from '@/types/task';
import { getPriorityColor, getPriorityLabel } from '@/utils/scheduler';

interface WeeklyScheduleProps {
  schedule: ScheduleEntry[];
}

export function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const getScheduleForDay = (day: string) => {
    return schedule.filter(entry => entry.day === day);
  };

  const getTaskTypeStyles = (type: 'academic' | 'extracurricular') => {
    return type === 'academic' 
      ? 'border-l-4 border-l-academic bg-academic/5'
      : 'border-l-4 border-l-extracurricular bg-extracurricular/5';
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {weekDays.map(day => {
              const daySchedule = getScheduleForDay(day);
              
              return (
                <div key={day} className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {day}
                    {daySchedule.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {daySchedule.length} task{daySchedule.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </h3>
                  
                  {daySchedule.length === 0 ? (
                    <p className="text-muted-foreground text-sm pl-4">No tasks scheduled</p>
                  ) : (
                    <div className="space-y-2">
                      {daySchedule.map(entry => (
                        <div
                          key={entry.task.id}
                          className={p-4 rounded-lg transition-all hover:shadow-md ${getTaskTypeStyles(entry.task.type)}}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{entry.task.name}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={text-xs bg-${getPriorityColor(entry.task.priority)}/10 border-${getPriorityColor(entry.task.priority)}/50}
                                >
                                  {getPriorityLabel(entry.task.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {entry.task.type === 'academic' 
                                  ? Subject: ${entry.task.subject}
                                  : Activity: ${entry.task.activity}
                                }
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {entry.startTime} - {entry.endTime}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}