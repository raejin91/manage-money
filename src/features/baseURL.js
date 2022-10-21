import axios from 'axios';

const baseURL = 'http://localhost:3001';

// const baseURL = 'https://moneymanagerreact.herokuapp.com';

const client = axios.create({ baseURL });

export default client;
