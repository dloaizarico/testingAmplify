import axios from 'axios'


export const removeUserFromGroup = (username: string, role: string) => {
  let apiName = 'AdminQueries';
  let path = '/removeUserFromGroup';

  let myInit = {
    body: {
      "username": username,
      "groupname": role
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`
    }
  }
  return axios.post(apiName, path, myInit);
}

export const addUserToGroup = (username: string, role: string) => {
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';

  let myInit = {
    body: {
      "username": username,
      "groupname": role
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`
    }
  }
  return axios.post(apiName, path, myInit);
}
