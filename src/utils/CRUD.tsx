export const handleEdit = (
  journal,
  setEditingJournal,
  setNewJournal,
  setMood,
  setSelectedTags,
  setShowAddJournal
) => {
  setEditingJournal(journal); // Set the journal being edited
  setNewJournal({ title: journal.title, content: journal.content }); // Pre-fill the form
  setMood(journal.mood); // Pre-fill mood
  setSelectedTags(journal.tags); // Pre-fill tags
  setShowAddJournal(true); // Show the form
};

export const handleAddJournal = ({
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
}) => {
  e.preventDefault();

  if (newJournal.title.trim() && newJournal.content.trim()) {
    if (editingJournal) {
      // Update existing journal
      setJournals(
        journals.map((journal) =>
          journal.date === editingJournal.date
            ? {
                ...journal,
                title: newJournal.title,
                content: newJournal.content,
                mood,
                tags: selectedTags,
              }
            : journal
        )
      );
      setEditingJournal(null); // Reset editing state
    } else {
      // Add a new journal
      setJournals([
        ...journals,
        {
          title: newJournal.title,
          content: newJournal.content,
          date: new Date().toLocaleString(),
          mood: mood,
          tags: selectedTags,
        },
      ]);
    }

    // Reset form
    setNewJournal({ title: '', content: '' });
    setMood(0);
    setSelectedTags([]);
    setShowAddJournal(false);
  }
};

export const deleteJournal = (date, journals, setJournals) => {
  const updatedJournals = journals.filter((journal) => journal.date !== date);
  setJournals(updatedJournals);
};
