import { nanoid } from "nanoid";

const EventService = {
  async create(data: { title: string; description: string; link: string; date: Date }) {
    return {
      id: nanoid(),
      title: data.title,
      description: data.description,
      link: data.link,
      date: data.date,
    };
  },
};

export default EventService;
