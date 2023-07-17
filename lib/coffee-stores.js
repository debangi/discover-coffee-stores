import { createApi } from 'unsplash-js';
// import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  // fetch: nodeFetch,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
    orientation: 'landscape',
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async (
  latLong = '22.5692857%2C88.4246689',
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  // foursquare

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'pub', limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: result.location.locality,
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });

  // .catch((err) => console.error(err));
  //foursquare
};
//22.5692857%2C88.4246689
// restaurant%2Bpub
