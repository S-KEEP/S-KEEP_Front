import {CardEntity} from './category';

export interface UserLocation {
  id: number;
  photoUrl: string;
  location: Location;
  userCategory: Category;
}

export interface Location {
  id: number;
  kakaoMapId: string;
  x: string;
  y: string;
  placeName: string;
  roadAddress: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export function cardEntityToCategoryMapper(cardEntity: CardEntity) {
  return {
    id: cardEntity.id,
    name: cardEntity.name,
    description: cardEntity.description,
  } as Category;
}
