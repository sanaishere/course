import { ID } from 'src/common/domain/Id';
import { Name } from './ValueObjects/name';
import { Description } from './ValueObjects/description';
import { Price } from './ValueObjects/price';
import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { Episode } from './Episodes/episode.entity';
import { Discount } from '../Discount/discount.entity';
import { DiscountIsExpired } from '../Discount/Errors/discount.error';

interface CourseType {
  id: ID;
  name: Name;
  description: Description;
  masterID: string;
  timeDuration: string;
  categoryId: string;
  subCategoryId: string;
  price: Price;
  status: CourseStatus;
  costType: CostType;
  lastUpdateDate: Date;
  photo?: string;
  episodes: Episode[];
  discount?: string;
}

interface CourseCreateProps {
  name: string;
  description: string;
  masterID: string;
  timeDuration: string;
  categoryId: string;
  subCategoryId: string;
  price: number;
  status: CourseStatus;
  costType: CostType;
  photo?: string;
}

export interface EpisodeCreateProps {
  name: string;
  sessionNum: number;
  timeDuration: string;
  videoUrl: string;
}

enum CourseStatus {
  COMPLETED,
  UNCOMPLETED,
}

enum CostType {
  FREE,
  COSTLY,
}

export class Course extends AggregateRoot<CourseType> {
  static create(props: CourseCreateProps) {
    Price.Valiate(props.price);
    return new Course({
      id: ID.create(),
      name: new Name(props.name),
      description: new Description(props.description),
      masterID: props.masterID,
      categoryId: props.categoryId,
      timeDuration: props.timeDuration,
      subCategoryId: props.subCategoryId,
      price: new Price(props.price),
      photo: props.photo,
      status: props.status,
      lastUpdateDate: new Date(),
      episodes: [],
      costType: props.costType,
    });
  }

  addEpisodes(props: EpisodeCreateProps) {
    const episode = Episode.create(props);
    this.properties.episodes.push(episode);
  }

  deleteEpisode(episodeId: string) {
    const index = this.properties.episodes.findIndex(
      (e) => e.getProperties().id.value === episodeId,
    );
    if (index >= 0) {
      this.properties.episodes.splice(index, 1);
    }
  }

  updateStatus(status: CourseStatus) {
    this.properties.status = status;
    this.properties.lastUpdateDate = new Date();
  }

  updatePrice(price: number) {
    Price.Valiate(price);
    this.properties.price = new Price(price);
    this.properties.lastUpdateDate = new Date();
  }

  updatePhoto(photo: string) {
    this.properties.photo = photo;
    this.properties.lastUpdateDate = new Date();
  }

  updateTimeDuration(duration: string) {
    this.properties.timeDuration = duration;
    this.properties.lastUpdateDate = new Date();
  }

  applyDicount(discount: Discount) {
    if (!discount.isActive()) {
      throw new DiscountIsExpired(
        `discount ${discount.getProperties().id.value} is not usable`,
      );
    }
    this.properties.discount = discount.getProperties().id.value;
  }
}
