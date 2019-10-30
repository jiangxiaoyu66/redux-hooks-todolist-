import React, { useState, useEffect, useReducer, createContext, useContext } from "react";
import { Input, Button, List } from "antd";
import "antd/dist/antd.css";
import store from "./Store/index";
import Reducer from './UseReducerDemo'

const Context = createContext()

function GetValue() {
  const value = useContext(Context)
  console.log(value)
  return (
    value
  )
}

function App() {


  const [inputValue,setValue] = useState('')
  const todolist = store.getState().list;
  const [list,setList] = useState(todolist)

  
  const storeChange = () => {
    const todolist = store.getState().list;
    setList(todolist)
  }

  useEffect(()=>{
    store.subscribe(storeChange)
    console.log('this is useEffct')  
    // 执行componentWillUnmount
    return () => {
      console.log('卸载effect')
    }
  },[list.length === 5])
  // 上一行不加[]这第二个参数，则每次都会解绑useEffect
  // 加了[]后，那么就是组件被卸载时解绑
  // 加了[list.length === 5],就是条件语句，list长度为5时候解绑
  // 加了[list],就是list值一变化就解绑

  const [todo, dispatch] = useReducer((state, action)=>{

    // const newState = JSON.parse(JSON.stringify(state))
    switch (action){
      case 'showTodo':
      return '已开始输入......'
      default:
        return ''
    }
  }, '')

  
  const addTodo = () => {
    const action = {
      type:'addTodo',
      value:inputValue
    }
    // 这里的store是引入的文件中导出的类/方法（这里将数据发送给reducer文件）
    store.dispatch(action)

  }


  
  return (
    <div>
     
      <Input 
        onChange={(e) => {
          setValue(e.target.value)
          dispatch('showTodo')
        }}
        style={{ width: 300 }} 
      />
       <Button type="primary" onClick={addTodo}>新增</Button>
      {/* 这里不能把state中的值做参数，因为这样的话他只是一个参数而已，和state无关，及时重名也不相关
      <Button type="primary" onClick={(inputValue) => addTodo(inputValue)}>新增</Button> */}


      <Context.Provider value={inputValue}>
        <GetValue />
      </Context.Provider>
      <div>{todo}</div>

      <List
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <div>{item}</div>
          </List.Item>
        )}
      />


    </div>
  );
}

export default App;
