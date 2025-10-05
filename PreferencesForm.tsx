import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';
import { StudentPreferences, TimePreference } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

interface PreferencesFormProps {
  preferences: StudentPreferences;
  onUpdatePreferences: (preferences: StudentPreferences) => void;
}

export function PreferencesForm({ preferences, onUpdatePreferences }: PreferencesFormProps) {
  const { toast } = useToast();
  const [maxStudyHoursPerDay, setMaxStudyHoursPerDay] = useState(preferences.maxStudyHoursPerDay);
  const [preferredStudyTime, setPreferredStudyTime] = useState<TimePreference>(preferences.preferredStudyTime);
  const [targetExtracurricularHours, setTargetExtracurricularHours] = useState(preferences.targetExtracurricularHours);

  const handleSave = () => {
    onUpdatePreferences({
      ...preferences,
      maxStudyHoursPerDay,
      preferredStudyTime,
      targetExtracurricularHours
    });

    toast({
      title: "Preferences Updated",
      description: "Your study preferences have been saved successfully",
    });
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Study Preferences
        </CardTitle>
        <CardDescription>
          Customize your schedule to match your study habits and goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="max-hours">Max Study Hours Per Day</Label>
            <Input
              id="max-hours"
              type="number"
              min="1"
              max="24"
              value={maxStudyHoursPerDay}
              onChange={(e) => setMaxStudyHoursPerDay(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Maximum hours you can dedicate to tasks daily
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="study-time">Preferred Study Time</Label>
            <Select value={preferredStudyTime} onValueChange={(v) => setPreferredStudyTime(v as TimePreference)}>
              <SelectTrigger id="study-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                <SelectItem value="night">Night (10 PM - 2 AM)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              When you're most productive
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-hours">Target Extracurricular Hours (Annual)</Label>
          <Input
            id="target-hours"
            type="number"
            min="0"
            max="1000"
            value={targetExtracurricularHours}
            onChange={(e) => setTargetExtracurricularHours(Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            Your yearly goal for extracurricular activities
          </p>
        </div>

        <Button onClick={handleSave} className="w-full bg-gradient-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}