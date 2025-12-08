import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('URL de la respuesta:', response.config.url);
    console.log('llamando funcion');
    if (response.config.url?.endsWith('/auth') && response.data?.securityToken) {
      const token = response.data.securityToken;

      localStorage.setItem('serviceToken', token);
      console.log('Token guardado en localStorage:', token);
    }
    return response;
  },
  (error) => {
    console.log('aqui esta el error');
    return Promise.reject(error);
  }
);

export default axiosInstance;
