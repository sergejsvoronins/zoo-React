import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import { IAnimalSmallContext } from "../../App";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import "./AnimalDetails.scss";


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
                    <div className="main__animalInfo" key={item.id}>
                        <div className="main__animalInfo__img">
                            <img src={item.imageUrl} alt={item.name} />
                            <button disabled={item.isFed} onClick={()=>{handleClick(item)}}>Mata</button>
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.longDescription}</p>
                        <p>Födelseår: {item.yearOfBirth}</p>
                        <p>Sista matning: {item.lastFed}</p>
                    </div>
                )
            }
        }
    })

        

    return (<>{animalDetailHtml}</>)
}