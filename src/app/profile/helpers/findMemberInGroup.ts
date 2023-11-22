const findConnection = <
  T extends { developerId: string; connectionId: string },
>(
  members: T[],
  developerId: string,
): string => {
  const member = members.find(
    (member: T) => member.developerId === developerId,
  );
  if (member) {
    return member.connectionId;
  }
  return "";
};

export default findConnection;
