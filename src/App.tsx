

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/Header';
import { IAnimalInfo } from './models/IAnimalInfo';
import { getAnimals } from './services/zooService';

export interface IAnimalSmallContext {
  animals: IAnimalInfo [];
  updateFeedTime(animal: IAnimalInfo):void;
  changeStatus(animal: IAnimalInfo):void;
}
function App() {
  const [animals, setAnimals] = useState<IAnimalInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(()=>{
    const getTheZoo = async () => {
      let animals = await getAnimals();
      setAnimals(animals);
      setIsLoading(true);
    }
    let dataFromLS = localStorage.getItem("animals");
    if(dataFromLS && !isLoading){
      let response : IAnimalInfo [] = JSON.parse(dataFromLS);

      setAnimals(response);
      setIsLoading(true);
      return;
    }
    else {
      if(!isLoading)
      getTheZoo();
    }
    localStorage.setItem("animals", JSON.stringify(animals));
  })

  const updateFeedTime = (animal:IAnimalInfo) => {
    let date = new Date();
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item, lastFed: date.toLocaleString(), isFed:true, lastFedSeconds: date.getSeconds()}: item);
    setAnimals(updatetdList);
  }
  const changeStatus = (animal:IAnimalInfo) => {
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item,isFed:false}: item);
    setAnimals(updatetdList);
  }
  console.log(animals);
  return (
  <>
      <header><Header /></header>
      <main className="main">
          <Outlet context = {{animals, updateFeedTime, changeStatus}} />
      </main>
  </>
  )
}

export default App;
