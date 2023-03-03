import axios from "axios"
import { IAnimalInfo } from "../models/IAnimalInfo";



const BASE_URL = "https://animals.azurewebsites.net/api/animals/";

export const getAnimals = async () => {
   let response = await axios.get<IAnimalInfo[]>(BASE_URL);
   return response.data;
}
