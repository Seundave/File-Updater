export const getFacultyList = (data) => {
  return Object.keys(data);
};

export const getDepartments = (selectedFaculty, result) => {
  console.log({result, selectedFaculty});
  const depart = Object.keys(result).find(
    (val) => val.trim() === selectedFaculty
  );
  return result[depart];
};
