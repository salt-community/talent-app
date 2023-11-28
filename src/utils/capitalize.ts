const capitalize = (s: string) => {
  if (s[0]) {
    return s[0].toUpperCase() + s.slice(1);
  }
  return s.toUpperCase();
};

export default capitalize;
