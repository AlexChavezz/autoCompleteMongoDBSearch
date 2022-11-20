import React, { ChangeEvent, useEffect, useState } from "react";


export default () => {

  const [busquedas, setBusquedas] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState<string>("");

  useEffect(() => {

    // window.fetch('http://api.openweathermap.org/geo/1.0/direct?q=cancun&limit=5&appid=c6a8e8e339b9082ff5b9a510116bff4f')
    window.fetch('https://api.openweathermap.org/data/2.5/weather?lat=21.1617854&lon=-86.8510468&appid=c6a8e8e339b9082ff5b9a510116bff4f')
    .then(res => res.json())
    .then(console.log)


    window.fetch(`http://localhost:3000/search/${keyWord}`)
      .then(res => res.json())
      .then(res=>{
        if(res)
        {
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(keyWord)
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder='Type something'
          name="keyword"
          value={keyWord}
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      {
        busquedas.length > 0 && busquedas.map( element => <p key={element._id}>{element.title} {" "} && {" "} {element.year}</p>)
      }
    </>
  );
}