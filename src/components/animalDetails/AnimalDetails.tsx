import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { IAnimalSmallContext } from "../../App";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import "./AnimalDetails.scss";


export const AnimalDetails = () => {
    const { id } = useParams();
    const { animals, updateFeedTime , changeStatus} = useOutletContext<IAnimalSmallContext>();
    const [curTime, setCurTime] = useState<number>(0);

    useEffect(()=>{
        let current = new Date().getHours();
        (current<3) ? setCurTime(current+24) : setCurTime(current);
        animals.map((animal)=>{
            if(id && +id===animal.id && animal.isFed){
                if(((curTime-animal.lastFedHours)>=3)){
                    changeStatus(animal);
                }       
            }
        })
    })
    const navigate = useNavigate();
    const handleClick = (animal:IAnimalInfo) => {
        updateFeedTime(animal);
    }
    const handleClickBack = () => {
        navigate("/");
    }

    let animalDetailHtml = animals.map((item)=>{
        if(id){
            if(+id===item.id){
                return (
                    <div className="main__animalInfo" key={item.id}>
                        <div className="main__animalInfo__header">
                            <h3>{item.name}</h3>
                            <span>Sista matning: {item.lastFed}</span>
                            <button onClick={handleClickBack}>Tillbaka</button>
                        </div>
                        <div className="main__animalInfo__img">
                            <img src={item.imageUrl} alt={item.name} />
                            {item.isFed ? 
                            <button className="notHungry" disabled={item.isFed} onClick={()=>{handleClick(item)}}>Djuret är mätt</button>:
                            <button className="isHungry"  onClick={()=>{handleClick(item)}}>Mata djuret</button>}
                        </div>
                        <div className="main__animalInfo__info">
                            <p>{item.longDescription}</p>
                            <p>Medicin: {item.medicine}</p>
                            <p>Latinskt namn: {item.latinName}</p>
                            <p>Födelseår: {item.yearOfBirth}</p>
                        </div>

                    </div>
                )
            }
        }
    })


    return (<>{animalDetailHtml}</>)
}