import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { ID } from 'src/common/domain/Id';
import { RatingRangeIsWrong } from './Errors/rating.errors';
interface RatingType {
  id: ID;
  rate: number;
  userId: string;
  courseId: string;
}

export class Rating extends AggregateRoot<RatingType> {
  rateCourse(props: RatingType) {
    if (props.rate < 1 || props.rate > 5) {
      throw new RatingRangeIsWrong('rating should be between 1 and 5');
    }
    return new Rating({
      id: ID.create(),
      userId: props.userId,
      courseId: props.courseId,
      rate: props.rate,
    });
  }
}
