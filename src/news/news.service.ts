import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
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
      comments: [
        {
          id: 1,
          author: "Tom",
          text: "text news 1",
          date: "'2022-08-07T09:19:30.697Z'"
        }
      ],
      date: "'2022-08-07T09:17:30.697Z'"
    },
    {
      id: 2,
      author: "Tom",
      title: "news 2",
      text: "text news 2", 
      comments: [],
      date: "'2022-08-07T09:17:33.697Z'"
    }
  ];

  create(createNewsDto: CreateNewsDto) {
    const news: News = {
      ...createNewsDto,
      id: this.news.length + 1,
      author: "Tom",
      comments: [],
      date: new Date().toISOString()
    };
    this.news.push(news);
    return news;
  }

  createComment(createCommentDto: CreateCommentDto) {
    const newsId = createCommentDto.id;
    const news = this.findOne(newsId);

    const comment: Comment = {
      ...createCommentDto,
      id: news.comments.length + 1,
      author: "Tom",
      date: new Date().toISOString()
    };

    this.news[newsId - 1].comments.push(comment);
  };

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
