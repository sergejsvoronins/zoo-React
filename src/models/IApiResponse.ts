import { IAnimalInfo } from "./IAnimalInfo";

export interface IApiResponse {
    animals?: IAnimalInfo[];
    error: string;
  }