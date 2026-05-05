export const searchTopChunks = (queryEmbedding, store, topK = 3) => {
  return store
    .map((item) => ({
      text: item.text,
      page: item.page,
      book: item.book,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};