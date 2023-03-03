import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import "./AnimalSmall.scss";
import { TfiFaceSad } from 'react-icons/tfi';
import { SlEmotsmile } from 'react-icons/sl';
import { IAnimalContext } from "../../models/IAnimalContext";


export const AnimalSmall = () => {
    const {animals, changeStatus } = useOutletContext<IAnimalContext>();
    const [curTime, setCurTime] = useState<number>(0);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(()=>{
        if(!isChecked){
            let current = new Date().getTime();
            setCurTime(current/1000);
            animals.map((animal)=>{
                if(animal.isFed && animal.lastFedSec){
                    if((curTime-animal.lastFedSec)>10){
                        changeStatus(animal);  
                    }
                }
                setIsChecked(true);
            })
            
        }
    })
    let navigate = useNavigate();
    const handleClick = (animal: IAnimalInfo) => {
        navigate(`/${animal.id}`)
    }
    
    let animalsHtml = animals.map((animal) => {
        return (
            <div key= {animal.id} className="main__animalContainer" onClick={()=>{handleClick(animal)}}>
                <div className="main__animalContainer__img">
                    <img src={animal.imageUrl} alt={animal.name} />
                </div>
                <div className="main__animalContainer__header">
                    <h3>{animal.name}</h3>
                    {animal.isFed ? <div><SlEmotsmile /></div> : <div className="isHungry"><TfiFaceSad /></div>}
                    <p>{animal.shortDescription}</p>
                </div>

            </div>
        )
    })

    return <>{animalsHtml}</>
}