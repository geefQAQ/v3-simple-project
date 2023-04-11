import data from './data.json';
import data1 from './data1.json';
import gradeList from './gradeList.json';
import classList from './classList.json';
import studentList from './studentList.json';
// import attendanceToday from './attendanceToday.json';

import {
  gettownaccess,
  attendanceToday,
  attendanceRecent7Days,
  holidayOverview,
  holidayRecent7Days,
  allDistricts,
  schoolsByDistrict,
} from './api'

const mockApi = [
  {
    url: '/mock/all-districts',
    timeout: 100,
    method: 'get',
    response: () => {
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
        data: schoolsByDistrict,
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
  },
  {
    url: '/mock/attendance',
    timeout: 100,
    method: 'get',
    response: (config) => {
      return {
        status : "ok",
        msg: "msg",
        data: attendanceToday,
        code: 0,
      }
    }
  },
  {
    url: '/mock/attendanceRecent7Days',
    timeout: 100,
    method: 'get',
    response: () => {
      return {
        status : "ok",
        msg: "msg",
        data: attendanceRecent7Days,
        code: 0,
      }
    }
  },
  {
    url: '/mock/holiday',
    timeout: 100,
    method: 'get',
    response: () => {
      return {
        status : "ok",
        msg: "msg",
        data: holidayOverview,
        code: 0,
      }
    }
  },
  {
    url: '/mock/holidayRecent7Days',
    timeout: 100,
    method: 'get',
    response: () => {
      return {
        status : "ok",
        msg: "msg",
        data: holidayRecent7Days,
        code: 0,
      }
    }
  }
]
export default mockApi;