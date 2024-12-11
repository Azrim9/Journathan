import JournalCard from '../components/JournalCard';
import { useState } from 'react';
import { toggleTag } from '../utils/toggleTag';
import { deleteJournal, handleAddJournal, handleEdit } from '../utils/CRUD';

export default function MainPage() {
  const [journals, setJournals] = useState([]);
  const [newJournal, setNewJournal] = useState({
    title: '',
    content: '',
  });
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [mood, setMood] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [editingJournal, setEditingJournal] = useState(null);

  return (
    <div className="blue-300 py-8 px-4">
      {/* Journals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Your Journals</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
            onClick={() => setShowAddJournal(!showAddJournal)}
          >
            {showAddJournal ? 'Back to Journals' : 'Add Journal'}
          </button>
        </div>

        {!showAddJournal && (
          <div>
            {journals.length === 0 ? (
              <p className="text-gray-500">No Journals yet.</p>
            ) : (
              journals.map((journal) => (
                <JournalCard
                  key={journal.date}
                  title={journal.title}
                  content={journal.content}
                  date={journal.date}
                  tags={journal.tags}
                  mood={journal.mood}
                  deleteJournal={() =>
                    deleteJournal(journal.date, journals, setJournals)
                  }
                  onEdit={() =>
                    handleEdit(
                      journal,
                      setEditingJournal,
                      setNewJournal,
                      setMood,
                      setSelectedTags,
                      setShowAddJournal
                    )
                  }
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Add Journal Form */}
      {showAddJournal && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            New Journal
          </h2>
          <form
            onSubmit={(e) =>
              handleAddJournal({
                setShowAddJournal,
                e,
                newJournal,
                journals,
                setJournals,
                setNewJournal,
                mood,
                selectedTags,
                setMood,
                setSelectedTags,
                editingJournal,
                setEditingJournal,
              })
            }
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Journal Title"
              value={newJournal.title}
              onChange={(e) =>
                setNewJournal({ ...newJournal, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            {/* Checkboxes */}
            <div>
              <label className="block text-gray-700 mb-2">Tags</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('LeetCode ')}
                    onChange={() => toggleTag('LeetCode ', setSelectedTags)}
                  />
                  <span>LeetCode</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('FrontEnd ')}
                    onChange={() => toggleTag('FrontEnd ', setSelectedTags)}
                  />
                  <span>FrontEnd</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes('BackEnd ')}
                    onChange={() => toggleTag('BackEnd ', setSelectedTags)}
                  />
                  <span>BackEnd</span>
                </label>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              placeholder="Journal Content"
              value={newJournal.content}
              onChange={(e) =>
                setNewJournal({ ...newJournal, content: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            {/* Slider */}
            <div className="space-x-2">
              <label className="text-gray-700">Mood</label>
              <input
                type="range"
                min="0"
                max="5"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full h-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-400"
            >
              Add Journal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
