import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import { IAnimalSmallContext } from "../../App";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import { getAnimalById } from "../../services/zooService";


export const AnimalDetails = () => {
    const { id } = useParams();
    const { animals, updateFeedTime } = useOutletContext<IAnimalSmallContext>();


    const handleClick = (animal:IAnimalInfo) => {
        updateFeedTime(animal);
    }
    let animalDetailHtml = animals.map((item)=>{
        if(id){
            if(+id===item.id){
                return (
                    <div key={item.id}>
                        <div>
                            <img src={item.imageUrl} alt={item.name} />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.longDescription}</p>
                        <p>Födelseår: {item.yearOfBirth}</p>
                        <p>Sista matning: {item.lastFed}</p>
                        <button onClick={()=>{handleClick(item)}}>Mata djuren</button>
                    </div>
                )
            }
        }
    })

        

    return (<>{animalDetailHtml}</>)
}