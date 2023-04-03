import data from './data.json';
import data1 from './data1.json';
import gradeList from './gradeList.json';
import classList from './classList.json';
import studentList from './studentList.json';

const allDistricts = [
  { id: '0', name: '桂一社区' },
  { id: '1', name: '桂园社区' },
  { id: '2', name: '石肯社区' },
  { id: '3', name: '叠南社区' },
  { id: '4', name: '怡海社区' },
  { id: '5', name: '桂雅社区' },
  { id: '6', name: '叠二社区' },
]

const mockApi = [
  {
    url: '/mock/all-districts',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      console.log('/mock/all-districts')
      return {
        status : "ok",
        msg: "msg",
        data: allDistricts,
        code: 0,
      }
    }
  },
  {
    url: '/mock/schools/:districtId',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { districtId } = query;
      let resData;
      if ( Number(districtId) % 2 === 0 ) {
        resData = data
      } else {
        resData = data1
      }
      return {
        status : "ok",
        msg: "msg",
        data: resData,
        code: 0,
      }
    }
  },
  {
    url: '/mock/grades/:schoolId',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { schoolId } = query;
      return {
        status : "ok",
        msg: "msg",
        data: gradeList,
        code: 0,
      }
    }
  },
  {
    url: '/mock/classes/:gradeId',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { gradeId } = query;
      return {
        status : "ok",
        msg: "msg",
        data: classList,
        code: 0,
      }
    }
  },
  {
    url: '/mock/students/:classId',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { classId } = query;
      return {
        status : "ok",
        msg: "msg",
        data: studentList,
        code: 0,
      }
    }
  }
]
export default mockApi;