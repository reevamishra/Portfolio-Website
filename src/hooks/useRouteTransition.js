import { useContext } from 'react';
import { TransitionContext } from 'pages/_app';

function useRouteTransition() {
  return useContext(TransitionContext);
}

export default useRouteTransition;
