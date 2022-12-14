import { Comment } from "src/comments/entities/comment.entity";

export class News {
    id: number;
    author: string;
    title: string;
    text: string;
    comments: Comment[];
    date: string;
}
