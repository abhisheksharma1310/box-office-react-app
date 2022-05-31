import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {isLoading: false, show: action.show, error: null};
    case 'FETCH_FAILED':
      return {...prevState, isLoading: false, error: action.error}
    default:
      return prevState;
  }
}

const initialState = {
  show: null,
  isLoading: true,
  error: null,
} 

const Show = () => {

  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState); 
  console.log(state);
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {

    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({type: 'FETCH_SUCCESS', show: results});
        }
      }).catch(err => {
        if (isMounted) {
          dispatch({type: 'FETCH_FAILED', error: err.message})
        }
      });
    return () => {
      isMounted = false;
    }
  }, [id]);

  console.log('show', state.show);

  if (state.isLoading) {
    return <div>Data is being loaded</div>
  }

  if (state.error) {
    return <div>Error occured: {state.error}</div>
  }

  return (
    <div>This is just Show Page</div>
  )
};

export default Show;