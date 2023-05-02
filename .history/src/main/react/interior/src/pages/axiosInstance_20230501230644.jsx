import axios from 'axios';
import https from 'https-browserify';

const agent = new https.Agent({
  rejectUnauthorized: false
});

const instance = axios.create({
  httpsAgent: agent
});

export default instance;
