import { useState, useEffect } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { WeeklySchedule } from '@/components/WeeklySchedule';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { SuggestionsPanel } from '@/components/SuggestionsPanel';
import { TaskList } from '@/components/TaskList';
import { PreferencesForm } from '@/components/PreferencesForm';
import { Task, StudentPreferences, ScheduleEntry } from '@/types/task';
import { SchedulingAlgorithm } from '@/utils/scheduler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Brain, Calendar, BarChart3 } from 'lucide-react';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [preferences, setPreferences] = useState<StudentPreferences>({
    maxStudyHoursPerDay: 8,
    preferredStudyTime: 'morning',
    freeTimeSlots: [],
    targetExtracurricularHours: 400
  });
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('academic-planner-tasks');
    const savedPreferences = localStorage.getItem('academic-planner-preferences');
    
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Convert date strings back to Date objects
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        deadline: new Date(task.deadline)
      }));
      setTasks(tasksWithDates);
    }
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('academic-planner-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('academic-planner-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Regenerate schedule whenever tasks or preferences change
  useEffect(() => {
    const scheduler = new SchedulingAlgorithm(tasks, preferences);
    const newSchedule = scheduler.generateSchedule();
    setSchedule(newSchedule);
  }, [tasks, preferences]);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const scheduler = new SchedulingAlgorithm(tasks, preferences);
  const stats = scheduler.calculateProgress();
  const suggestions = scheduler.generateSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Smart Academic Planner
                  </h1>
                  <p className="text-sm text-muted-foreground">Balance academics & extracurriculars effectively</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm font-medium">AI-Powered Suggestions</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <ProgressDashboard stats={stats} targetExtracurricularHours={preferences.targetExtracurricularHours} />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="add-task" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="add-task">Add Task</TabsTrigger>
                  <TabsTrigger value="schedule">
                    Schedule
                    <Calendar className="ml-2 h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="tasks">
                    All Tasks
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="add-task" className="mt-6">
                  <TaskForm onAddTask={handleAddTask} />
                </TabsContent>
                
                <TabsContent value="schedule" className="mt-6">
                  <WeeklySchedule schedule={schedule} />
                </TabsContent>
                
                <TabsContent value="tasks" className="mt-6">
                  <TaskList 
                    tasks={tasks}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <aside className="space-y-8">
              <SuggestionsPanel suggestions={suggestions} />
              <PreferencesForm 
                preferences={preferences}
                onUpdatePreferences={setPreferences}
              />
            </aside>
          </div>
        </main>
    </div>
  );
};

export default Index;