import {ICategory} from './location';

export type CardEntity = {
  id: number;
  name: string;
  description: string;
};

export type CategoryCardResponseDto = CardEntity[];

export interface Location {
  id: number;
  kakaoMapId: string;
  placeName: string;
  roadAddress: string;
  x: string;
  y: string;
}

export interface UserLocation {
  id: number;
  photoUrl: string;
  location: Location;
  userCategory: ICategory;
}

export interface IPage<T> {
  totalElement: number;
  totalPage: number;
  userLocationList: any;
  userCategory: ICategory;
  result: {
    userLocationList: T[];
  };
}
