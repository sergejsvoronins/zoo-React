

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { IAnimalInfo } from './models/IAnimalInfo';
import { getAnimals } from './services/zooService';

export interface IAnimalSmallContext {
  animals: IAnimalInfo [];
  updateAnimalList(animal: IAnimalInfo):void;
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
  const updateAnimalList = (animal:IAnimalInfo) => {
    let updatedList = animals.map((item)=>animal.id===item.id ? animal : item);
    setAnimals(updatedList);
    console.log(animals);
  }
  console.log(animals);
  return (
  <>
      <header>Header</header>
      <main className="main">
          <Outlet context = {{animals, updateAnimalList}} />
      </main>
      <footer>Footer</footer>
  </>
  )
}

export default App;
