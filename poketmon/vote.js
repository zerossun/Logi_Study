const api = {
  getMovies: async () => {
    try {
      const movies = await request(
        'https://yts.mx/api/v2/list_movies.json?limit=15'
      );
      return {
        isError: false,
        data: movies?.data?.movies,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};

export { api };
