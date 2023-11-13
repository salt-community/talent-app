const splitSkills = (skills: string) => {
  return skills.split(/(\s+)/).filter((e) => e.trim().length > 0);
};

export default splitSkills;
