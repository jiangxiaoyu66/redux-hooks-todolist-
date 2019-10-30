const defaultState={
  list:[
    '早上5点起床',
    '中午12点吃饭',
    '晚上6点下班',
  ]
}


export default (state = defaultState, action) => {
  console.log(action)
  if(action.type === 'addTodo'){
    // JSON.parse(text) 方法将数据转换为 JavaScript 对象(text必须为string字符串)
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(action.value)
    // newState.push(action.value)
    return newState
  }
  return(
    state
  )}