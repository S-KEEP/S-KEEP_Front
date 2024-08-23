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

export interface UserCategory {
  id: number;
  title: string;
  description: string;
}

export interface UserLocation {
  id: number;
  photoUrl: string;
  location: Location;
  userCategory: UserCategory;
}

export interface IPage<T> {
  totalElement: number;
  totalPage: number;
  userLocationList: any;
  result: {
    userLocationList: T[];
  };
}
