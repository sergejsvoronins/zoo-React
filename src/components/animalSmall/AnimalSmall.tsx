import { useNavigate, useOutletContext } from "react-router-dom";
import { IAnimalSmallContext } from "../../App";
import { IAnimalInfo } from "../../models/IAnimalInfo";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import "./AnimalSmall.scss";


export const AnimalSmall = () => {
    const {animals} = useOutletContext<IAnimalSmallContext>();
    let navigate = useNavigate();
    const handleClick = (animal: IAnimalInfo) => {
        navigate(`/${animal.id}`)
    }
    let animalsHtml = animals.map((animal) => {
        return (
            <div key= {animal.id} className="main__animalContainer" onClick={()=>{handleClick(animal)}}>
                <div>
                    <img src={animal.imageUrl} alt={animal.name} />
                </div>
                <h3>{animal.name}</h3>
                <p>{animal.shortDescription}</p>
            </div>
        )
    })

    return <>{animalsHtml}</>
}