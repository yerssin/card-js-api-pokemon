console.log("que lo que");

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151); //me genera un numero aleatorio
  fetchData(random); //
});

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); //comillas invertidas para usar $ de JS y traer un id con un nro aleatorio
    const data = await res.json();

    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      hp: data.stats[0].base_stat,
      experiencia: data.base_experience,
      ataque: data.stats[1].base_stat,
      especial: data.stats[3].base_stat,
      defensa: data.stats[2].base_stat,
    };

    pintaCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const pintaCard = (pokemon) => {
  const flex = document.querySelector(".flex"); //aca donde va a ir el template
  const template = document.querySelector("#template-card").content; //capturamos el template, quiero acceder a la info que trae el template usando content
  const clone = template.cloneNode(true); //se recomienda para no usar directamente el original porque puede dar algun error
  const fragment = document.createDocumentFragment();

  clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`; //innerHTML para usar las etiquetas sin que se noten ejm </span>
  clone.querySelector(".card-body-text").textContent =
    pokemon.experiencia + " Exp";
  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.ataque + "K"; //para acceder al primer elemento del ataque
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.especial + "K";
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defensa + "K";

  fragment.appendChild(clone); //le digo que aca guarde este pedazo de codigo clone
  flex.appendChild(fragment);
};
