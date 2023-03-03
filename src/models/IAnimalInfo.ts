export interface IAnimalInfo {
    id: number,
    imageUrl: string,
    isFed: boolean,
    lastFed: string,
    longDescription:string,
    medicine: string,
    name: string,
    latinName: string,
    shortDescription: string,
    yearOfBirth: number,
    lastFedSec?: number
}