

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/Header';
import { IAnimalInfo } from './models/IAnimalInfo';
import { getAnimals } from './services/zooService';

export interface IAnimalSmallContext {
  animals: IAnimalInfo [];
  updateFeedTime(animal: IAnimalInfo):void;
}
function App() {
  const [animals, setAnimals] = useState<IAnimalInfo[]>([]);
  const [isLoadingFromApi, setIsLoadingFromApi] = useState<boolean>(false);
  const [timeToEat, setTimeToEat] = useState<Date>();
  useEffect(()=>{
      const getTheZoo = async () => {
          let animals = await getAnimals();
          setAnimals(animals);
          setIsLoadingFromApi(true);
      }
      // let getFromLocalStorage : string | null =localStorage.getItem("animals");
      if(isLoadingFromApi){
          localStorage.setItem("animals", JSON.stringify(animals));
          return;
      }
      else {
        getTheZoo();
      }
      
  })
  // useEffect(()=>{
  //   let date = new Date();
  //   setTimeToEat(date);
  // })

  const updateFeedTime = (animal:IAnimalInfo) => {
    let date = new Date;
    let curTime = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item, lastFed: curTime, isFed:true}: item);
    setAnimals(updatetdList);
    console.log(date.toLocaleString())
  }
  console.log(animals);
  return (
  <>
      <header><Header /></header>
      <main className="main">
          <Outlet context = {{animals, updateFeedTime}} />
      </main>
  </>
  )
}

export default App;
