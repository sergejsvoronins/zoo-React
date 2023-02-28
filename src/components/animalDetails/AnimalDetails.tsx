import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import { IAnimalSmallContext } from "../../App";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import { getAnimalById } from "../../services/zooService";


export const AnimalDetails = () => {
    const [animal, setAnimal] = useState<IAnimalInfo>();
    const { id } = useParams();
    const { animals, updateAnimalList } = useOutletContext<IAnimalSmallContext>();

    useEffect(()=>{
        const getData = async () => {
            if(id) {
                let response = await getAnimalById(id);
                setAnimal(response);
            }
        }
        if(animal) return;
        getData();
    })
    const handleClick = () => {
        if(animal) {
            setAnimal({...animal,lastFed:Date()});
            updateAnimalList(animal);
        }
        console.log(animal)
    }
    let animalDetailHtml = 
        <div>
            <div>
                <img src={animal?.imageUrl} alt={animal?.name} />
            </div>
            <h3>{animal?.name}</h3>
            <p>{animal?.longDescription}</p>
            <p>Födelseår: {animal?.yearOfBirth}</p>
            <p>Sista matning: {animal?.lastFed}</p>
            <button onClick={handleClick}>Mata djuren</button>
        </div>
        

    return <>{animalDetailHtml}</>
}