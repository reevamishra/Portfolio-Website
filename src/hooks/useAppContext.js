import { useContext } from 'react';
import { AppContext } from 'pages/_app';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
