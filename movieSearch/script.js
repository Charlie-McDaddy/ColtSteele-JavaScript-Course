const input = document.querySelector("input");

const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com", {
    params: {
      apikey: "7b4e2867",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    alert("No movies found");
    input.value = "";
    return [];
  }
  return response.data.Search;
};

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.Poster}"/>
      <h1>${movie.Title}</h1>
      `;

    document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 1500));
