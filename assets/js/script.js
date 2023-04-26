const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const pokemonSearch = document.querySelector('.input__search')

const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let pokemonStart = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        pokemonSearch.value = ''
        pokemonStart = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found :c'
        pokemonNumber.innerHTML = ''

    }
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    renderPokemon(pokemonSearch.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    pokemonStart += 1
    renderPokemon(pokemonStart)
})

btnPrev.addEventListener('click', () => {
    if (pokemonStart > 1) {
        pokemonStart -= 1
        renderPokemon(pokemonStart)
    }

})

renderPokemon(pokemonStart)