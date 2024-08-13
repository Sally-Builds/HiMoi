import axios, {AxiosInstance} from "axios";
import { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_SECRET_KEY } from "../../constants";
import moment from "moment";


const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.zoom.us',
})


let token: string;
const generateToken = async () => {
  try {
    const url = `/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`
    const res = await axiosInstance.post(url, {}, {

      auth: {
        username: ZOOM_CLIENT_ID,
        password: ZOOM_SECRET_KEY
      }
  })
  
  token = res.data.access_token
  return res.data.access_token
  }catch (e) {
    console.log(e)
    return null
  }
}

export const generateMeetingLink = async (topic: string, date: string) => {
  const data = {
    topic,
    type:2,
    start_time: moment(date, 'MMMM Do YYYY, h a'),
    duration:60,
    timezone:"Africa/Lagos",
    // "password":"test123"
  }
  try {
    const res = await axiosInstance.post('/v2/users/me/meetings', data)
    return res.data
  }catch(e) {
    console.log(e)
    return null
  }
}

axiosInstance.interceptors.request.use((config: any) => {
  // Add a common header for all requests (e.g., authorization token)
  // config.headers.common['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';
  if(!config.url.startsWith('/oauth/')) {
    config.headers['Authorization'] = `Bearer ${token}`;
}
  return config;
}, error => {
  // Handle request setup errors
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, async error => {
  console.log('yes', error.response.status == 401 && !error.config._retry)
  if(error.response.status == 401 && !error.config._retry) {
    error.config._retry = true;
    try {
      const res = await generateToken()
      error.config.headers['Authorization'] = `Bearer ${res}`;
      return axiosInstance(error.config)
    }catch(e) {
      return Promise.reject(error);
    }
  }
});