const fetchData = async () => {
  const response = await axios.get("http://www.omdbapi.com", {
    params: {
      apikey: "7b4e2867",
      s: "avengers",
    },
  });

  console.log(response.data);
};

fetchData();
