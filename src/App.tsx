

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { IAnimalInfo } from './models/IAnimalInfo';
import { getAnimals } from './services/zooService';

export interface IAnimalSmallContext {
  animals: IAnimalInfo [];
  updateFeedTime(animal: IAnimalInfo):void;
}
function App() {
  const [animals, setAnimals] = useState<IAnimalInfo[]>([]);
  const [isLoadingFromApi, setIsLoadingFromApi] = useState<boolean>(false);
  const [isLoadingFromLS, setIsLoadingFromLS] = useState<boolean>(false);
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

  const updateFeedTime = (animal:IAnimalInfo) => {
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item, lastFed: Date(), isFed:true}: item);
    setAnimals(updatetdList);
  }
  console.log(animals);
  return (
  <>
      <header>Header</header>
      <main className="main">
          <Outlet context = {{animals, updateFeedTime}} />
      </main>
      <footer>Footer</footer>
  </>
  )
}

export default App;
