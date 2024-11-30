import { ID } from 'src/common/domain/Id';
import { Name } from '../ValueObjects/name';
import { Entity } from 'src/common/domain/entity';
import { EpisodeCreateProps } from '../course.entity';

interface EpisodeType {
  id: ID;
  name: Name;
  sessionNum: number;
  timeDuration: string;
  videoUrl: string;
}

export class Episode extends Entity<EpisodeType> {
  static create(props: EpisodeCreateProps) {
    return new Episode({
      id: ID.create(),
      name: new Name(props.name),
      sessionNum: props.sessionNum,
      timeDuration: props.timeDuration,
      videoUrl: props.videoUrl,
    });
  }
}
