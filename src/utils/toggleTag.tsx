export const toggleTag = (tag, setSelectedTags) => {
  setSelectedTags((prevTags) =>
    prevTags.includes(tag)
      ? prevTags.filter((t) => t !== tag)
      : [...prevTags, tag]
  );
};
