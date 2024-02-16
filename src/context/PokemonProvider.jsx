import React, { useEffect, useState } from 'react'
import { PokemonContext } from './PokemonContext'
import { useForm } from '../hook/useForm'

export const PokemonProvider = ({children}) => {

const [allPokemons,setAllPokemons] = useState([])
const [offset,setOffset]=useState (0)
const [globalPokemons,setGlobalPokemons] = useState([])


//hooks

const {valueSearch, onInputChange , onResetForm} = useForm({
    valueSearch:''
})




// estados simples
const [loading,setLoading] = useState(true)
const [active,setActive] = useState (false)



// lLamar 50 pokemones a la API
const getAllPokemons = async (limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(
        `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
};

// Llamar todos los pokemones
const getGlobalPokemons = async (limit = 500) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(
        `${baseURL}pokemon?limit=${limit}&offset=0`
    );
    const data = await res.json();

    const promises = data.results.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
    });
    const results = await Promise.all(promises);

    setGlobalPokemons(results);
    setLoading(false);
};

// Llamar a un pokemon por ID
const getPokemonByID = async id => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
};


//cargar mas

const onClickLoadMore = () => {
    setOffset(offset + 50)
}














useEffect(() => {
  getAllPokemons()
}, [offset])

useEffect(() => {
    getGlobalPokemons()
  }, [])

const [typeSelected,setTypeSelected] = useState ({
	    grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
}) 

const [filteredPokemons, setfilteredPokemons] = useState([]);

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};
  return (
   
   <PokemonContext.Provider value={{
                valueSearch,
                onInputChange,
                onResetForm,
                allPokemons,
                globalPokemons,
                getPokemonByID,
               

                loading,
				setLoading,
                onClickLoadMore,

                active,
				setActive,

                handleCheckbox,
                filteredPokemons,




   }}>
        {children}
   </PokemonContext.Provider>
  )
}
