import data from './data.json'

const getDemoApi = [
  {
    url: '/mock/demo',
    timeout: 100,
    method: 'get',
    response: {
      status : "ok",
      msg: "msg",
      data: data,
      code: 0,
    }
  }
]
export default getDemoApi;