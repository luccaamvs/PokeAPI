
const fetchPokemon = () => {
    const getPokemonUrl = ID => `https://pokeapi.co/api/v2/pokemon/${ID}`; //Fazer a interpolacao aqui para tornar dinamica a chamada do pokemon atraves de seu ID.

    const pokemonPromises = [];     //Array que vai englobar as chamadas de pokemons

    for(let i = 1; i<=151; i++){
       pokemonPromises.push(
        fetch(getPokemonUrl(i)).then(response => response.json())
       ) 
    }

    Promise.all(pokemonPromises)    //Quando todas as promises forem resolvidas, o ALL irá agir 
    .then(pokemons => {             //e o then ira exibir todos os pokemons.
        //console.log(pokemons);

        //O reduce() serve para reduzir arrays a algum tipo de dado.
        //O parametro pokemon é definido para indicar em qual pokemon nos estamos.
        //Cada pokémon insirido será adicionado no accumulator.
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
            <h2 class="card-title"> ${pokemon.id}. ${pokemon.name} </h2>
            <p  class="card-subtitle">${types.join(' / ')} </p>
            </li>` 
            return accumulator;
        }, '') ;

        const ul = document.querySelector('[data-js="pokedex"]');

        ul.innerHTML = listPokemons;

    });
    
    /*
    fetch(url) //promise
    .then(response => response.json()) // esse then resulta em outra promise para mostrar o pokemon
    .then(pokemon => {
    })    */
}

    fetchPokemon();