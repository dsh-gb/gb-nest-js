import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
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

  // обновление новости с заданным id
  updateNews(id: number, updateNewsDto: UpdateNewsDto) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }
    
    news.title = updateNewsDto.title ? updateNewsDto.title : news.title;
    news.text = updateNewsDto.text ? updateNewsDto.text : news.text;
  }

  // обновление комментария для новости с заданным newsId и commId
  updateComment(newsId: number, updateComment: UpdateCommentDto) {
    const news = this.news.find((news) => news.id === newsId);

    if (!news) {
      throw new NotFoundException();
    }
    
    const comm = news.comments.find((comm) => comm.id === updateComment.id);
    if (!comm) {
      throw new NotFoundException();
    }

    comm.text = updateComment.text;

    //news.comments = [];
    this.createComment(updateComment);
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
