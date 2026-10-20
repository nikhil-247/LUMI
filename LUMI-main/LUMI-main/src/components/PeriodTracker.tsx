import { useState } from 'react';
import { format, addDays } from 'date-fns';
import toast from 'react-hot-toast';

interface PeriodLog {
  id: string;
  startDate: string;
  endDate: string;
  symptoms: string[];
}

const PeriodTracker = () => {
  // No sample health data: users start with an empty tracker.
  const [logs, setLogs] = useState<PeriodLog[]>([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    'Cramps',
    'Fatigue',
    'Headache',
    'Bloating',
    'Mood Swings',
    'Back Pain',
  ];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error('Choose both a start date and an end date.');
      return;
    }
    if (endDate < startDate) {
      toast.error('End date cannot be before the start date.');
      return;
    }
    if (logs.some((log) => startDate <= log.endDate && endDate >= log.startDate)) {
      toast.error('This date range overlaps an existing log.');
      return;
    }

    const newLog: PeriodLog = {
      id: Date.now().toString(),
      startDate,
      endDate,
      symptoms: selectedSymptoms,
    };

    setLogs(prev => [...prev, newLog]);
    setStartDate('');
    setEndDate('');
    setSelectedSymptoms([]);
    toast.success('Period log added successfully!');
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const calculateNextPeriod = () => {
    if (logs.length === 0) return null;
    const latestLog = [...logs].sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
    const lastPeriod = new Date(`${latestLog.startDate}T00:00:00`);
    return format(addDays(lastPeriod, 28), 'MMM dd, yyyy');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Log Period</h3>
        <form onSubmit={handleAddLog} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms
            </label>
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-2 rounded-md text-sm ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Log
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Period History</h3>
        {calculateNextPeriod() && (
          <div className="mb-6 p-4 bg-pink-50 rounded-lg">
            <p className="text-pink-800">
              Estimated next period (assuming a 28-day cycle):{' '}
              <span className="font-semibold">{calculateNextPeriod()}</span>
            </p>
            <p className="text-xs text-pink-700 mt-1">This is a simple estimate, not a medical prediction. Cycle lengths can vary.</p>
          </div>
        )}
        <div className="space-y-4">
          {logs.length === 0 && (
            <p className="text-sm text-gray-500">No period logs yet. Add a date range to start tracking. Entries remain in memory and are not saved after refresh.</p>
          )}
          {logs.map(log => (
            <div
              key={log.id}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">
                    {format(new Date(log.startDate), 'MMM dd, yyyy')} -{' '}
                    {format(new Date(log.endDate), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {
                      Math.floor(
                        (new Date(`${log.endDate}T00:00:00`).getTime() - new Date(`${log.startDate}T00:00:00`).getTime()) /
                        (1000 * 60 * 60 * 24)
                      ) + 1
                    } days
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {log.symptoms.map(symptom => (
                  <span
                    key={symptom}
                    className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;