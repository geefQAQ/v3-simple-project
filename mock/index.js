import * as API from './api'

const mockApi = [
  {
    url: '/mock/all-districts',
    timeout: 100,
    method: 'get',
    response: () => {
      return {
        status : "ok",
        msg: "成功",
        data: API.allDistricts,
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
      return {
        status : "ok",
        msg: "成功",
        data: API.schoolsByDistrict,
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
        msg: "成功",
        data: API.getGradesBySchoolCode,
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
        msg: "成功",
        data: API.getClassesByGradeId,
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
        data: API.getStudentsByClassId,
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
        data: API.attendanceToday,
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
        msg: "成功",
        data: API.attendanceRecent7Days,
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
        msg: "成功",
        data: API.holidayOverview,
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
        msg: "成功",
        data: API.holidayRecent7Days,
        code: 0,
      }
    }
  },
  {
    url: '/mock/sendCode',
    timeout: 100,
    method: 'post',
    response: ({ body }) => {
      const { mobile } = body
      console.log(`output->mobile`, mobile)
      return {
        status : "ok",
        msg: "成功",
        data: null,
        code: 0,
      }
    }
  },
  {
    url: '/mock/login',
    timeout: 100,
    method: 'post',
    response: ({ body }) => {
      const { mobile, code } = body
      return {
        status : "ok",
        msg: "成功",
        data: {
          token: 'loginToken'
        },
        code: 0,
      }
    }
  },
  {
    url: '/mock/refreshToken',
    timeout: 100,
    method: 'post',
    response: ({ body }) => {
      const { token } = body
      return {
        status : "ok",
        msg: "成功",
        data: {
          token: 'refreshToken'
        },
        code: 0,
      }
    }
  },
  {
    url: '/mock/noToken',
    method: 'post',
    statusCode: 401,
    response: () => {
      return {
        status : "error",
        msg: "没有token",
        data: null
      }
    },
  },
]
export default mockApi;