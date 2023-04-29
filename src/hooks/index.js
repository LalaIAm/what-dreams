import api from '../api/app-write';
import { Server } from '../utils/config';
import { useEffect, useReducer, useState } from 'react';

export const FetchState = {
  FETCH_INIT: 0,
  FETCH_SUCCESS: 1,
  FETCH_FAILURE: 2,
};

export const useGetUser = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return {
          ...state,
          isLoading: true,
          isError: false,
          errorMessage: null,
        };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          user: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: true,
    data: [],
    errorMessage: null,
  });

  useEffect(() => {
    let didCancel = false;

    const getUser = async () => {
      dispatch({ type: FetchState.FETCH_INIT });

      try {
        const account = await api.getAccount();
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: account });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE, payload: e.message });
        }
      }
    };
    getUser();
    return () => (didCancel = true);
  }, []);

  return [state, dispatch];
};

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
