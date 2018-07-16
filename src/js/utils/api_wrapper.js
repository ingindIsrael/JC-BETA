/* global localStorage, fetch */
import {logout} from '../actions';
import {Session} from '../utils/session';

const rootAPIendpoint = process.env.apiHost+'/api';

let HEADERS = {
  'Content-Type': 'application/json'
};

const getToken = () => {
  if (Session) {
    const token = Session.store.getSession().access_token;
    return token;
  }
  return null;
};

const appendCompany = (data) => {
  if (Session && data) {
    data.employer = Session.store.getSession().user.profile.employer;
    return data;
  }
};

/* AVAILABLE MODELS
  - badges
  - employees
  - employers
  - favlists
  - positions
  - profiles
  - shifts
  - venues
  - oauth/token (generate token)
  - tokenuser (get user data from local saved token)
*/

/**
 * Fetch JSON from API through GET method
 * @param {string} model Model data to be fetched. **Must be plural**
 * @returns {data}
 */
export const GET = async (model, id = '', extraHeaders = {}) => {
  const response = await fetch(`${rootAPIendpoint}/${model}/${id}`, {
    method: 'GET',
    headers: new Headers({
      ...HEADERS,
      ...extraHeaders,
      Authorization: `JWT ${getToken()}`
    })
  }).catch(err => {
    throw new Error(`Could not GET models from API due to -> ${err}`);
  });
  const data = await response.json();
  if (data.detail) {
    logout();
    return 0;
  }
  return data;
};

export const POST = (model, postData, extraHeaders = {}) => {
  
  if(['register', 'login'].indexOf(model) == -1){
    HEADERS['Authorization'] = `JWT ${getToken()}`;
    postData = appendCompany(postData);
  } 
  const REQ = {
    method: 'POST',
    headers: Object.assign(HEADERS,extraHeaders),
    body: JSON.stringify(postData)
  };
  
  const response = fetch(`${rootAPIendpoint}/${model}/`, REQ)
    .then((resp) => {
      if(resp.status == 400) throw new Error('Bad Request');
      const data = resp.json();
      return data;
    })
    .catch(err => {
      throw new Error(`Could not POST model to API due to -> ${err}`);
    });
  // if (data.detail) {
  //   logout();
  //   return 0;
  // }
  return response;
};

export const PUT = async (model, id, putData, extraHeaders = {}) => {
  const response = await fetch(`${rootAPIendpoint}/${model}/${id}`, {
    method: 'PUT',
    headers: new Headers({
      ...HEADERS,
      ...extraHeaders,
      Authorization: `JWT ${getToken()}`
    }),
    body: putData
  }).catch(err => {
    throw new Error(`Could not UPDATE model on API due to -> ${err}`);
  });
  const data = await response.json();
  if (data.detail) {
    logout();
    return 0;
  }
  return data;
};

export const PATCH = async (model, id, putData, extraHeaders = {}) => {
  const response = await fetch(`${rootAPIendpoint}/${model}/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      ...HEADERS,
      ...extraHeaders,
      Authorization: `JWT ${getToken()}`
    }),
    body: putData
  }).catch(err => {
    throw new Error(`Could not UPDATE model on API due to -> ${err}`);
  });
  const data = await response.json();
  if (data.detail) {
    logout();
    return 0;
  }
  return data;
};

export const DELETE = async (model, id = '', extraHeaders = {}) => {
  await fetch(`${rootAPIendpoint}/${model}/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      ...HEADERS,
      extraHeaders
    })
  }).catch(err => {
    throw new Error(`Could not GET models from API due to -> ${err}`);
  });
};