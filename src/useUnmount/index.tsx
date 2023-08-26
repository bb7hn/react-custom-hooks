import { useEffect } from 'react'

const useUnmount = (callback:()=>(void)) => {
    useEffect(()=>{
        return callback()
    },[]);
    return
}

export default useUnmount
export {useUnmount}