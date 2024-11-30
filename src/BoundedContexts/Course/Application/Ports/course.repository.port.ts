import { Course } from '../../Domain/Course/course.entity';
import { Episode } from '../../Domain/Course/Episodes/episode.entity';

export interface CourseRepository {
  create: (course: Course) => Promise<void>;
  update: (course: Course) => Promise<void>;
  findOne: (courseId: string) => Promise<Course>;
  //paginated
  findAll: () => Promise<Course[]>;
  save: (course: Course) => Promise<void>;
  delete: (courseId: string) => Promise<void>;
  addEpisode(episode: Episode): Promise<void>;
  getEpisodes: (courseId: string) => Promise<Episode[]>;
}
