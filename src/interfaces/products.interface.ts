export interface ICreateRequest {
  name: string;
  price: number;
  quantity: number;
}

export interface IGetByIdRequest {
  id: string;
}

export interface IUpdateRequest {
  name: string;
  price: number;
  quantity: number;
  id: string;
}
