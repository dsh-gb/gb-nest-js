import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {

  private news: News[] = [
    {
      id: 1,
      author: "Tom",
      title: "news 1",
      text: "text news 1",
      date: "'2022-08-07T09:17:30.697Z'"
    },
    {
      id: 2,
      author: "Tom",
      title: "news 2",
      text: "text news 2", 
      date: "'2022-08-07T09:17:33.697Z'"
    }
  ];

  create(createNewsDto: CreateNewsDto) {
    const news: News = {
      ...createNewsDto,
      id: this.news.length + 1,
      author: "Tom",
      date: new Date().toISOString()
    };
    this.news.push(news);
    return news;
  }

  findAll() {
    return this.news;
  }

  findOne(id: number) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    return news;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    this.news = this.news.filter((news) => news.id != id);

    return `news by id = ${id} deleted`;
  }
}
