const mainScreen = document.querySelector(".main-screen");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeId = document.getElementById("pokemon-id");
const pokeName = document.getElementById("pokemon-name");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteFront = document.getElementById("sprite");
const spriteBack = document.getElementById("poke-back-image");
const types = document.getElementById("types");

const isValid = async (pokemon) => {
  const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + pokemon;

  if (pokemon.length === 0) {
    alert("Pokémon not found");
    return false;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    getData(data);
  } catch (err) {
    console.log(err);
    alert("Pokémon not found");
    return false;
  }
};

const getData = (data) => {
  mainScreen.classList.remove("hide");

  pokeId.textContent = "#" + data.id;
  pokeName.textContent = data.name.toUpperCase();
  weight.textContent = data.weight;
  height.textContent = data.height;
  attack.textContent = data.stats[1].base_stat;
  hp.textContent = data.stats[0].base_stat;
  defense.textContent = data.stats[2].base_stat;
  spAttack.textContent = data.stats[3].base_stat;
  spDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
  spriteFront.src = data.sprites.front_default;
  spriteBack.src = data.sprites.back_default;

  const dataTypes = data.types;
  const dataFirstType = dataTypes[0];
  types.innerHTML = "";

  if (dataTypes[1]) {
    var span1 = document.createElement("span");
    var span2 = document.createElement("span");
    span1.innerHTML = `<span class="poke-type-two">${data.types[1].type.name.toUpperCase()}</span>`;
    types.appendChild(span1);
    span2.innerHTML = `<span class="poke-type-one">${data.types[0].type.name.toUpperCase()}</span>`;
    types.appendChild(span2);
    mainScreen.classList.add(dataFirstType.type.name);
  } else {
    var span1 = document.createElement("span");
    span1.innerHTML = `<span class="poke-type-one">${data.types[0].type.name.toUpperCase()}</span>`;
    types.appendChild(span1);
    mainScreen.classList.add(dataFirstType.type.name);
  }

  mainScreen.classList = `main-screen ${dataFirstType.type.name}`;
};

searchBtn.addEventListener("click", () => {
  isValid(searchInput.value.toLowerCase().replace(" ", "-"));
});
