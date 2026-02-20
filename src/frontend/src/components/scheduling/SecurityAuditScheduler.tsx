import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export default function SecurityAuditScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    toast.success(
      `Tactical Onboarding Call scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`
    );
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  return (
    <Card className="border-emerald-500/20 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-lg">Schedule Security Audit</CardTitle>
        </div>
        <CardDescription>Book your Tactical Onboarding Call</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            className="rounded-md"
          />
        </div>

        {selectedDate && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Available Time Slots</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={
                    selectedTime === time
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'border-white/10 hover:border-emerald-500/50'
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
        >
          Confirm Booking
        </Button>
      </CardContent>
    </Card>
  );
}
