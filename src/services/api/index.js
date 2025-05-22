import {UTILS} from 'utils';
import {URLS} from 'services/api/api-urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGEKEYS} from 'config/constants';

export const postData = async (url, data) => {
  //   const token = await AsyncStorage.getItem(STORAGEKEYS.token);
  console.log('url: ', url);
  console.log('data: ', data);
  const response = await client.post(url, data);
  // const response = await client.post(url, data, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  console.log("response: ", response?.data);
  return response?.data;
};
export const postDataParams = async (url, formDataString) => { 
  try {
    // Make the API call with the formDataString as the payload
    const response = await axios.post(url, formDataString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Optional headers: Check if any other headers are required, e.g., Authorization
        // 'Authorization': 'Bearer <token>',
      },
    });
    return response?.data; // Return the response data
  } catch (error) {
    console.log('Error in postDataParams:', error?.response?.data || error?.message);
    throw error; // Throw the error to be handled by the calling function
  }
};


export const deleteData = async (url, payload) => {
  console.log('url: ', url);
  const response = await client.delete(url, {data: payload});
  return response;
};
export const putData = async (url, data) => {
  console.log('url: ', url);
  const response = await client.put(url, data);
  return response;
};
export const postFormData = async (url, data) => {
  console.log('url==>', url);

  data = UTILS.getFormData(data);
  const token = await AsyncStorage.getItem(STORAGEKEYS.token);
  return axios
    .post(URLS.base_url + url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res)
    .catch(err => {
      throw err;
    });
};
export const postImage = async (url, data) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    console.log('`${URLS.base_url}${url}`', `${URLS.base_url}${url}`);
    const response = await fetch(`${URLS.base_url}${url}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        otherHeader: 'foo',
      },
      method: 'POST',
      body: data,
    })
      .then(res => {
        if (res.ok) {
          console.log('Image uploaded', res);
        } else {
          // Handle upload error
          console.log('Image upload failed');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  } catch (error) {
    // Handle any error during image selection or upload
    console.log('Error:', error);
  }
};
export const postArrrayFormData = async (url, data) => {
  console.log('url==>', url);

  // data = UTILS.getFormData(data);
  // console.log('data==>', data?._parts);
  return axios
    .post(URLS.base_url + url, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => res)
    .catch(err => {
      throw err;
    });
};
export const postHrDoc = async (url, data) => {
  console.log('url==>', url);

  // data = UTILS.getFormData(data);
  // console.log('data==>', data?._parts);
  return axios
    .post(url, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => res)
    .catch(err => {
      throw err;
    });
};
export const getData = async url => {
  console.log('url : ', url);
  const response = await client.get(url);
  console.log("Response data",response?.data);
  return response?.data;
};
