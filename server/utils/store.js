const store = [];

export const addChunk = (chunk, embedding) => {
  store.push({ chunk, embedding });
};

export const getStore = () => store;