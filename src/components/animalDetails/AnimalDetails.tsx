import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { IAnimalInfo } from "../../models/IAnimalInfo";
import "./AnimalDetails.scss";
import { MdFastfood } from 'react-icons/md';
import { IAnimalContext } from "../../models/IAnimalContext";

export const AnimalDetails = () => {
    const { id } = useParams();
    const { animals, updateFeedTime , changeStatus} = useOutletContext<IAnimalContext>();
    const [curTime, setCurTime] = useState<number>(0);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    useEffect(()=>{
        if(!isChecked){
            let current = new Date().getTime();
            setCurTime(current/(1000*60*60));
            animals.map((animal)=>{
                if(id && +id===animal.id && animal.isFed && animal.lastFedHours){
                    if((curTime-animal.lastFedHours)>3){
                        changeStatus(animal);
                    }
                }
                setIsChecked(true);
            })
        }
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
                        </div>
                        <div className="main__animalInfo__info">
                            <p>{item.longDescription}</p>
                            <p>Medicin: {item.medicine}</p>
                            <p>Latinskt namn: {item.latinName}</p>
                            <p>Födelseår: {item.yearOfBirth}</p>
                        </div>
                        <div className="main__animalInfo__btn">
                            {item.isFed ? 
                            <button className="notHungry" disabled={item.isFed} onClick={()=>{handleClick(item)}}>Mätt</button>:
                            <button className="isHungry"  onClick={()=>{handleClick(item)}}>Ge mig: <MdFastfood /></button>}  
                        </div>
                    </div>
                )
            }
        }
    })


    return (<>{animalDetailHtml}</>)
}