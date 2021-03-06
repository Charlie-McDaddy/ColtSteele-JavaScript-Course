const autocompleteConfig = {
  renderOption(item) {
    const imgSrc = item.Poster === "N/A" ? "" : item.Poster;
    return `
    <img src="${imgSrc}"/>
    ${item.Title} (${item.Year})
    `;
  },
  inputValue(item) {
    return item.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com", {
      params: {
        apikey: "7b4e2867",
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};

createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(item) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onItemSelect(item, document.querySelector("#left-summary"));
  },
});
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(item) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onItemSelect(item, document.querySelector("#right-summary"));
  },
});

const onItemSelect = async (item, summaryElement) => {
  const response = await axios.get("http://www.omdbapi.com", {
    params: {
      apikey: "7b4e2867",
      i: item.imdbID,
    },
  });
  summaryElement.innerHTML = itemTemplate(response.data);
};

const itemTemplate = (itemDetail) => {
  return `
<article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${itemDetail.Poster}" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1>${itemDetail.Title}</h1>
      <h4>${itemDetail.Genre}</h4>
      <p>${itemDetail.Plot}</p>
    </div>
  </div>
</article>
<article class="notification is-primary">
  <p class="title">${itemDetail.Awards}</p>
  <p class="subtitle">Awards</p>
</article>
<article class="notification is-primary">
  <p class="title">${itemDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
</article>
<article class="notification is-primary">
  <p class="title">${itemDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
  <p class="title">${itemDetail.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
</article>
<article class="notification is-primary">
  <p class="title">${itemDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
</article>
`;
};
