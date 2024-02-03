import axios from 'axios';
import useSnackbarStore from '@/store/snackbarStore';
import pinia from '@/plugins/pinia';
import { useRouter } from 'vue-router';
let router = useRouter();
let snackbarStore = useSnackbarStore(pinia);
let {setSnackBar} = snackbarStore;
let exportAxios = axios.create();

let setAxios = (token: string | null) => {
  baseURL: 'https://hotel-reservation-backend-sgtq.onrender.com/api/v1/'
  exportAxios = axios.create({
    headers: {
      Authorization: token,
      'Access-Control-Allow-Origin': '*'
    }
  })
  exportAxios.interceptors.response.use(
    response => {
      return new Promise(resolve => {
        resolve(response)
      })
    },
    err => {
      if (router && err.response.status == '401') {
        router.push({
          name: 'Home'
        })
      }
      setSnackBar({
        color: 'error',
        message: `${err.response.status} : ${err.response.message}`,
        isOpen: true
      });
      return new Promise((_, reject) => {
        reject(err);
      })
    }
  )
}

export {exportAxios, setAxios};

