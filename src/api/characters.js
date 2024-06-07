import axios from 'axios';

export const characters = async (page = 1) => {
  return axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response)
    .catch(error => {
      console.error(error);
    })
};