import { PrismaService } from 'nestjs-prisma';
import { ReviewRepository } from 'src/BoundedContexts/Course/Application/Ports/review.repository.port';
import { Comment } from 'src/BoundedContexts/Course/Domain/Review/Domain/comment.entity';
import { Rating } from 'src/BoundedContexts/Course/Domain/Review/Domain/rating.entity';

export class ReviewRepositoryHandler implements ReviewRepository {
  constructor(
    private readonly prisma: PrismaService,
    p,
  ) {}
  async createComment(comment: Comment): Promise<void> {}

  async updateComment(comment: Comment): Promise<void> {}
  async getComments(courseId: string): Promise<any> {
    const data = await this.prisma.comment.findMany({
      where: {
        courseId,
      },
    });
    return data;
  }
  async createRating(rating: Rating): Promise<void> {}

  async getAvgRating(courseId: string): Promise<any> {}
}
