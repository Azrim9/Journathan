export default function JournalCard({
  title,
  content,
  date,
  deleteJournal,
  mood,
  tags,
  onEdit,
}) {
  return (
    <div>
      <button onClick={() => deleteJournal(date)}>X</button>
      <button onClick={onEdit}>Edit</button> <div>Tags: {tags}</div>
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{content}</p>
      <div>Mood: {mood}</div>
    </div>
  );
}
