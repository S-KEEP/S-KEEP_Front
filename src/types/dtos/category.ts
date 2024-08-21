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

export interface CategoryResponseDto {
  errorCode: string | null; // null 이므로 string | null 로 지정
  message: string; // 항상 존재하는 message
  result: {
    userLocationList: UserLocation[];
    totalPage: number; // 총 페이지 수
  };
}
