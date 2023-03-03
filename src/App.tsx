

import { directive } from '@babel/types';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/Header';
import { IAnimalInfo } from './models/IAnimalInfo';
import { getAnimals } from './services/zooService';


function App() {
  const [animals, setAnimals] = useState<IAnimalInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const feedIntervalInSec: number = 10;
  useEffect(()=>{
    const getTheZoo = async () => {
      let response = await getAnimals();
      if(response.animals){
        setAnimals(response.animals);
      }
      else {
        setError(response.error)
      }
      
      setIsLoading(true);
    }
    let dataFromLS = localStorage.getItem("animals");
    if(dataFromLS && !isLoading && dataFromLS!=="[]"){
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
    let toLocaleString = date.toLocaleString();
    let seconds = date.getTime()/1000;
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item, lastFed: toLocaleString, isFed:true, lastFedSec: seconds}: item);
    setAnimals(updatetdList);
  }
  const changeStatus = (animal:IAnimalInfo) => {
    let updatetdList = animals.map((item)=>animal.id===item.id ? {...item,isFed:false}: item);
    setAnimals(updatetdList);
  }
  let html = 
    <>
      <header><Header /></header>
      <main className="main">
      <Outlet context = {{animals, updateFeedTime, changeStatus, feedIntervalInSec}} />
      </main>
    </>
  return (
    <>
      {error ? (
        <>
          <div className="error">{error}</div>
        </>) : (
        <>
          {html}
        </>
      )}
    </>
  )
}

export default App;
