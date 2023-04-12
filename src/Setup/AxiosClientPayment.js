import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL =  process.env.REACT_APP_PAYMENT_API_URI;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};


//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

export function getPaymentRequest(URL, token = '') {
  if (token !== '')
    axiosClient.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

  return axiosClient.get(URL, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }).then(response => response);
} 

export function postPaymentRequest(URL, payload) {  
  console.log(`base2 url is ${process.env.REACT_APP_PAYMENT_API_URI}`)
  return axiosClient.post(URL, payload, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }).then(response => response);
}

export function putRequest(URL, payload, token = '') {
  if (token !== '')
    axiosClient.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  return axiosClient.put(URL, payload, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }).then(response => response);
}

export function deleteRequest(URL, token = '') {
  if (token !== '')
    axiosClient.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  return axiosClient.delete(URL, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }).then(response => response);
}