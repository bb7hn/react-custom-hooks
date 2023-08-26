export type SetterParam<T> = (prev: T) => T;
export type InitialParam<T> = () => T;
export type ReturnValue<T> = [
  T,
  (value:T | SetterParam<T>)=>void,
  {
    history:T[],
    pointer:number,
    go:(index:number)=>T,
    previous:()=>T,
    next:()=>T,
  },
];
