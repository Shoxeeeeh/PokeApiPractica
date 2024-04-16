import React, { useEffect, useState } from 'react'
import Card from './Card';
import axios from "axios";

const Buscador = () => {
    const [inputValue, setInputValue] = useState("");
    const [url, setUrl] = useState("");

    async function getData(e) {
        e.preventDefault();
        try {
            const respuesta1 = await axios.get("https://pokeapi.co/api/v2/pokemon/");
            const pokemons = respuesta1.data.results;
            
            // Recorre los resultados del endpoint
            pokemons.forEach(pokemon => {
                // Compara el nombre del pokemon con el inputValue
                if (pokemon.name === inputValue) {
                    try{
                      setUrl(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
                    }catch(error){
                        console.log(error);
                    }
                    // Aquí puedes realizar las acciones necesarias cuando encuentras el pokemon
                }
            });
        } catch(error) {
            console.log(error);
        }
    };



    return (
        <>
            <form className='d-flex container bg-light gap-2 p-4 rounded-2'>
                <div className="mb-3 col-8">
                    <label className="form-label text-black">Nombre del Pokemon</label>
                    <input type="text" value={inputValue} className="form-control" id="BuscadorPokemon" placeholder="Ingrese nombre del Pokemon" onChange={e => setInputValue(e.target.value)} />
                </div>
                <div className=' align-items-center col-4  d-flex justify-content-center mt-3'>
                    <button type="submit" className="btn container btn-primary" onClick={getData}>Buscar Pokemon!</button>
                </div>
            </form>
            <div className="m-4 d-flex justify-content-center gap-4">
                <Card data={url}/>
            </div>
        </>
    )
}

export default Buscador
