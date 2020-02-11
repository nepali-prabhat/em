const ThoughtReducer = (state = { thoughtsList: [{}] }, { type, data }) => {
  state.thoughtsList = [{}]
  if (data != undefined) {
    return Object.assign({},state,{
      thoughtsList:data})
  }
  return state
};

export default ThoughtReducer