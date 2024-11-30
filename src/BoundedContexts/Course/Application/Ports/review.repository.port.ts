import { Comment } from '../../Domain/Review/Domain/comment.entity';
import { Rating } from '../../Domain/Review/Domain/rating.entity';

export interface ReviewRepository {
  createComment: (comment: Comment) => Promise<void>;
  updateComment: (comment: Comment) => Promise<void>;
  //paginated
  //fix type
  getComments: (courseId: string) => Promise<any>;
  createRating: (rating: Rating) => Promise<void>;
  getAvgRating: (courseId: string) => Promise<any>;
}
