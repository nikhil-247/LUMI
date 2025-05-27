import { useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Reminder {
  id: string;
  medicineName: string;
  time: string;
  taken: boolean;
}

const MedicineReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      medicineName: 'Vitamin D',
      time: '09:00',
      taken: false,
    },
    {
      id: '2',
      medicineName: 'Iron Supplement',
      time: '14:00',
      taken: false,
    },
  ]);

  const [newMedicine, setNewMedicine] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedicine || !newTime) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      medicineName: newMedicine,
      time: newTime,
      taken: false,
    };

    setReminders(prev => [...prev, newReminder]);
    setNewMedicine('');
    setNewTime('');
    toast.success('Reminder added successfully!');
  };

  const toggleTaken = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, taken: !reminder.taken }
          : reminder
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Reminder</h3>
        <form onSubmit={handleAddReminder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medicine Name
            </label>
            <input
              type="text"
              value={newMedicine}
              onChange={(e) => setNewMedicine(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Reminder
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Medicines</h3>
        <div className="space-y-4">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium">{reminder.medicineName}</h4>
                <p className="text-sm text-gray-500">{reminder.time}</p>
              </div>
              <button
                onClick={() => toggleTaken(reminder.id)}
                className={`px-4 py-2 rounded-md ${
                  reminder.taken
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {reminder.taken ? 'Taken' : 'Mark as Taken'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineReminder;