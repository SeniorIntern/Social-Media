const isLikedAlready = (likes: string[], userId: string): boolean => {
  return likes.some((likeId) => likeId === userId);
};

export default isLikedAlready;
