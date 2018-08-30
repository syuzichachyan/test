import {
  REQUEST_FAVORITES,
  RECEIVE_FAVORITES,
  RECEIVE_ALL_FAVORITES
} from '../constants';

const requestFavourites = () => {
  return {
    type: REQUEST_FAVORITES
  };
};

const receiveFavourites = json => {
  return {
    type: RECEIVE_FAVORITES,
    payload: json
  };
};

const allreceiveFavourites = json => {
  return {
    type: RECEIVE_ALL_FAVORITES,
    payload: json.data
  };
};

export const fetchFavourites = (state, jwt) => {
  return dispatch => {
    dispatch(requestFavourites());
    return fetch(`https://acafoodapi.haffollc.com/v1/favourites`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      method: 'POST',
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch(receiveFavourites(response.data));
      });
  };
};

export const getFetchFavourites = jwt => {
  return dispatch => {
    dispatch(requestFavourites());
    return fetch(`https://acafoodapi.haffollc.com/v1/favourites`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(json => dispatch(allreceiveFavourites(json)))
      .catch(e => {
        console.log(e);
      });
  };
};

export const deleteFetchFavourites = (id, jwt) => {
  return dispatch => {
    dispatch(requestFavourites());
    return fetch(`https://acafoodapi.haffollc.com/v1/favourite/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFavourites());
        dispatch(getFetchFavourites(jwt));
      })
      .catch(e => {
        console.log(e);
      });
  };
};
