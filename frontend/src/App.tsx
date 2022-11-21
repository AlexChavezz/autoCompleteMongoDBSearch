import React, { ChangeEvent, useEffect, useState } from "react";
import mongoImage from './assets/mongodb.webp';
import searchImage from './assets/search.svg';
export default () => {

  const [busquedas, setBusquedas] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState<string>("");
  const [currentMovie, setCurrentMovie] = useState<{} | null>(null);
  useEffect(() => {
    if (keyWord.length === 0) 
    {
      setBusquedas([]);
      return;
    };
    window.fetch(`http://localhost:3000/search/${keyWord}`)
      .then(res => res.json())
      .then(res => {
        if (res) {
          return setBusquedas(res)
        }
        setBusquedas([]);
      })
      .catch(console.log)
  }, [keyWord])

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    setKeyWord(value);

  }

  return (
    <main className='main-content'>
      <header className='header'>
        <section>
          <img src={mongoImage} alt='mongo-image' className='mongo-image' />
        </section>
        <section>
          <form
            className='form'
          // onSubmit={onSubmit}
          >
            <input
              type="text"
              className='input-text'
              name="keyword"
              value={keyWord}
              onChange={onChange}
            />
            <img src={searchImage} className='search-icon' alt='search-image' />
            {/* <input type="submit" /> */}
          </form>
          <div className='searches-container'>
            {
              busquedas.length > 0 && busquedas.map(element => <ItemSearched
                key={element._id}
                {...element}
                setKeyWord={setKeyWord}
                setCurrentMovie={setCurrentMovie}
                setBusquedas={setBusquedas}
              />
              )
            }
          </div>
        </section>
      </header>
      {
        currentMovie &&
        <section>
         <p>{JSON.stringify(currentMovie, 1, null)}</p>
        </section>
      }
    </main>
  );
}

interface ItemSearchedProps {
  title: string,
  _id: string,
  setKeyWord: React.Dispatch<React.SetStateAction<string>>,
  setCurrentMovie: React.Dispatch<React.SetStateAction<{}>>
  setBusquedas: React.Dispatch<React.SetStateAction<any[]>>
}

const ItemSearched = ({ _id, title, setKeyWord, setCurrentMovie, setBusquedas }: ItemSearchedProps) => {

  async function selectItem() {
    try {
      const response = await window.fetch(`http://localhost:3000/search/get/${_id}`);
      const data = await response.json();
      console.log(data);
      if (data) {
        setCurrentMovie(data);
        setKeyWord("");
        setBusquedas([])
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className='item-searched'
      onClick={selectItem}
    >
      <p>{title}</p>
    </div>
  );
}