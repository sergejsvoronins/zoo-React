import axios from "axios"
import { response } from "express";
import { IAnimalInfo } from "../models/IAnimalInfo";
import { IApiResponse } from "../models/IApiResponse";



const BASE_URL = "https://animals.azurewebsites.net/api/animals/";

export const getAnimals = async (): Promise<IApiResponse> => {

   try {
      let response = await axios.get<IAnimalInfo[]>(BASE_URL);
   
      return {animals: response.data, error: ""};
   }
   catch {
      return {error: "Loading is failed"}
   }
}
