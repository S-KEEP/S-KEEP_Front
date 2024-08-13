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
  fixedCategory: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
}
