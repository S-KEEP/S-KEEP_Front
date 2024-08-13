export interface UserLocation {
  id: number;
  photoUrl: string;
  location: object;
  userCategory: object;
}

export interface Location {
  id: number;
  kakaoMapId: string;
  x: string;
  y: string;
  fixedCategory: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
}
