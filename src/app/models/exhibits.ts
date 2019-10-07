interface IExhibitTechnology {
  id: number;
  name: string;
}

interface IExhibitImage {
  id: number;
  code: string;
  deleted: boolean;
  fileName: string;
  imageDate: string;
  location: string;
  main: boolean;
  mimeType: string;
  status: string;
}

export interface IExhibitResponse {
  id: number;
  authors: string[];
  createDate: Date;
  gikNumber: string;
  images: IExhibitImage[];
  mainImage: IExhibitImage;
  invNumber: string;
  museumCode: string;
  museumId: number;
  name: string;
  regDate: Date;
  regNumber: number;
  regReasonId: number;
  statusId: number;
  taskId: number;
  technologies: IExhibitTechnology[];
  type: number;
  typologyId: number;
}

export interface IExhibitsRespose {
  objects: IExhibitResponse[];
  statistics: any[];
}
