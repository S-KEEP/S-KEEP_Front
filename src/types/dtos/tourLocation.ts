export interface TourLocationDTO {
  title: string;
  mapX: string;
  mapY: string;
  address: string;
  dist: string;
  contentTypeId: string;
  imageUrl: string;
}

export interface EditorTourLocationDto {
  title: string;
  address: string;
  mapX: string;
  mapY: string;
  imageUrl: string;
  category: string;
  editorName: string;
}
