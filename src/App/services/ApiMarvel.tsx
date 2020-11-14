import axios from 'axios';

export const apiMarvel = axios.create({});

apiMarvel.interceptors.request.use(
  async (config) => {
    const timeStamp = '1605223795';
    const keyPublic = 'ac0e6ef268281d3500da1765e90e680b';
    const hast = 'f4f2645b556cab829e6c309242778c71';
    config.url =
      config.url +
      '?ts=' +
      timeStamp +
      '&apikey=' +
      keyPublic +
      '&hash=' +
      hast;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiMarvel.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
