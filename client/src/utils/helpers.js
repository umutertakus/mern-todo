export const changeMongoIds = (data, id) => {
  const changedArray = [];
  data.forEach((element) => {
    const { _id, ...rest } = element;
    changedArray.push({
      [id]: _id,
      ...rest,
    });
  });
  return changedArray;
};
