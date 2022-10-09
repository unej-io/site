const SomeService = {
  async hello() {
    return { hello: "world" };
  },
};

const NewsService = {
  async create() {
    return { news: "created" };
  },
};

export { SomeService, NewsService };
