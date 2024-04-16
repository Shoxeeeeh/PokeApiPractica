import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Card = ({data}) => {

    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(data);
                setPokemonData(response.data);
            } catch (error) {
                console.error("Error al obtener datos del Pokémon:", error);
            }
        };
        fetchData();
    }, [data]);

    if (!data) {
        return <p>No hay URL definida para obtener datos del Pokémon</p>;
    }

    return (
        <>
            {pokemonData && (
                <div className='card' style={{ width: "18rem" }}>
                    <div className='text-center'>
                        <img src={pokemonData.sprites?.front_default} className='card-img-top' alt={pokemonData.name} style={{ width: "10rem"}} />
                    </div>
                    <div className='card-body'>
                        <h5 className='card-title'>{pokemonData.name}</h5>
                        <p className='card-text'>{pokemonData.species?.url}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Tipo: {pokemonData.types && pokemonData.types.length >= 2 ? `${pokemonData.types[1].type.name}, ${pokemonData.types[0].type.name}` : 'No disponible'}</li>
                        <li className="list-group-item">Ataques: {pokemonData.moves && pokemonData.moves.length >= 2 ? `${pokemonData.moves[1].move.name}, ${pokemonData.moves[0].move.name}` : 'No disponible'}</li>
                    </ul>
                </div>
            )}
        </>
    );
    
    
}

export default Card
