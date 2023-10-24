const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2]) {
    return match[2];
  }
  return null;
};

const toEmbed = (id: string) => {
  return `//www.youtube.com/embed/${id}`;
};

export default toEmbed;
