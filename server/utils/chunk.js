export const splitTextWithPages = (text, pageSize = 2000) => {
  const chunks = [];

  let page = 1;

  for (let i = 0; i < text.length; i += pageSize) {
    chunks.push({
      text: text.slice(i, i + pageSize),
      page,
    });

    page++;
  }

  return chunks;
};