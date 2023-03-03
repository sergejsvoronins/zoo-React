import { IAnimalInfo } from "./IAnimalInfo";

export interface IAnimalContext {
    animals: IAnimalInfo [];
    updateFeedTime(animal: IAnimalInfo):void;
    changeStatus(animal: IAnimalInfo):void;
  }