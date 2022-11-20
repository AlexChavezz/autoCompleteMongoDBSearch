import React, {ChangeEvent, useEffect, useState} from "react";


export default () => {
  
  const [busquedas, setBusquedas] = useState<any[]>([]);

  useEffect(()=>{

  }, [])

  const [keyWord, setKeyWord] = useState<string>("");
  function onChange({target}: ChangeEvent<HTMLInputElement>)
  {
    const { name, value } = target;
    setKeyWord(value);
    
  }

  async function onSubmit(e: React.FormEvent)
  {
    e.preventDefault();
    console.log(keyWord)
  }
  
  return (
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
  );
}