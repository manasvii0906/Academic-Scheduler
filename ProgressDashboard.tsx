import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Clock, 
  Target, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Activity
} from 'lucide-react';
import { ProgressStats } from '@/types/task';
import { format } from 'date-fns';

interface ProgressDashboardProps {
  stats: ProgressStats;
  targetExtracurricularHours: number;
}

export function ProgressDashboard({ stats, targetExtracurricularHours }: ProgressDashboardProps) {
  const academicProgress = stats.totalAcademicHours > 0 
    ? (stats.completedAcademicHours / stats.totalAcademicHours) * 100
    : 0;

  const extracurricularProgress = stats.totalExtracurricularHours > 0
    ? (stats.completedExtracurricularHours / stats.totalExtracurricularHours) * 100
    : 0;

  const overallProgress = targetExtracurricularHours > 0
    ? ((stats.completedExtracurricularHours + stats.totalExtracurricularHours - stats.completedExtracurricularHours) / targetExtracurricularHours) * 100
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Academic Hours Card */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-academic" />
            Academic Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.completedAcademicHours} / {stats.totalAcademicHours}
          </div>
          <Progress value={academicProgress} className="mt-3 h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {academicProgress.toFixed(1)}% completed
          </p>
        </CardContent>
      </Card>

      {/* Extracurricular Hours Card */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-extracurricular" />
            Extracurricular Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.completedExtracurricularHours} / {stats.totalExtracurricularHours}
          </div>
          <Progress value={extracurricularProgress} className="mt-3 h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {extracurricularProgress.toFixed(1)}% completed
          </p>
        </CardContent>
      </Card>

      {/* Balance Ratio Card */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart className="h-4 w-4 text-primary" />
            Balance Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.balanceRatio.toFixed(1)}%
          </div>
          <div className="flex items-center gap-2 mt-3">
            {stats.balanceRatio >= 25 && stats.balanceRatio <= 35 ? (
              <Badge variant="outline" className="text-xs bg-accent/10">
                <CheckCircle className="h-3 w-3 mr-1" />
                Optimal
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-destructive/10">
                <AlertCircle className="h-3 w-3 mr-1" />
                Adjust
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Target: 30% extracurricular
          </p>
        </CardContent>
      </Card>

      {/* Target Progress Card */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            Target Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.min(overallProgress, 100).toFixed(1)}%
          </div>
          <Progress value={Math.min(overallProgress, 100)} className="mt-3 h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Goal: {targetExtracurricularHours} hours
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      {stats.upcomingDeadlines.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4 bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-destructive" />
              Urgent Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.upcomingDeadlines.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-3">
                    {task.type === 'academic' ? (
                      <BookOpen className="h-4 w-4 text-academic" />
                    ) : (
                      <Activity className="h-4 w-4 text-extracurricular" />
                    )}
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.type === 'academic' ? task.subject : task.activity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">
                      Due: {format(task.deadline, 'MMM dd')}
                    </Badge>
                    <Badge variant="outline">
                      {task.hoursRequired}h
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}