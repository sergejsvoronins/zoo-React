import axios from "axios"
import { IAnimalInfo } from "../models/IAnimalInfo";
import { IAnimalSmall } from "../models/IAnimalSmall";


const BASE_URL = "https://animals.azurewebsites.net/api/animals/";


export const getAnimals = async () => {
   let response = await axios.get<IAnimalInfo[]>(BASE_URL);
   return response.data;
}
export const getAnimalById = async (id:string) => {
   let response = await axios.get<IAnimalInfo>(BASE_URL+id);
   return response.data;
}