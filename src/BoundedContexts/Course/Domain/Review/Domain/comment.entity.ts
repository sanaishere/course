import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { ID } from 'src/common/domain/Id';

interface CommentType {
  id: ID;
  text: string;
  userId: string;
  courseId: string;
  createdDate: Date;
}

interface CommentCreateProps {
  id: ID;
  text: string;
  userId: string;
  courseId: string;
  createdDate: Date;
}
export class Comment extends AggregateRoot<CommentType> {
  static commentCourse(props: CommentCreateProps) {
    return new Comment({
      id: ID.create(),
      userId: props.userId,
      courseId: props.courseId,
      text: props.text,
      createdDate: new Date(),
    });
  }

  updateComment(text: string) {
    this.properties.text = text;
  }
}
