import { useEffect } from 'react';

const useUnmount = (callback:()=>(void)) => {
  useEffect(() => callback(), [callback]);
};

export default useUnmount;
export { useUnmount };
