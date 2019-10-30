import React, { useReducer, useContext, createContext } from 'react';

const context = createContext()
function ReducerDemo(){

  const value = useContext(context)
  console.log(value)


    const [ count , dispatch ] =useReducer((state,action)=>{
        switch(action){
            case 'add':
                return state+1
            case 'sub':
                return state-1
            default:
                return state
        }
    },0)
    return (
       <div>
           
       </div>
    )

}

export default ReducerDemo