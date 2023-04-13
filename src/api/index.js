import request from "@/utils/service";

export function getAllDistricts(options) {
  return request({
    url: "/mock/all-districts",
    method: "get"
  }, options)
}

export function getSchoolsByDistrictId(districtId, options) {
  return request({
    url: `/mock/schools/${districtId}`,
    method: "get"
  }, options)
}

export function getGradesBySchoolId(schoolId) {
  return request({
    url: `/mock/grades/${schoolId}`,
    method: "get"
  })
}

export function getClassesByGradeId(gradeId) {
  return request({
    url: `/mock/classes/${gradeId}`,
    method: "get"
  })
}

export function getStudentsByClassId(classId, options) {
  return request({
    url: `/mock/students/${classId}`,
    method: "get"
  }, options)
}

export function getAttendanceByToday(options) {
  return request({
    url: `/mock/attendance/`,
    method: "get"
  }, options)
}

export function getAttendanceByRecent7Days(options) {
  return request({
    url: '/mock/attendanceRecent7Days',
    method: "get"
  }, options)
}

export function getHolidayByToday(options) {
  return request({
    url: '/mock/holiday',
    method: "get"
  }, options)
}

export function getHolidayByRecent7Days(options) {
  return request({
    url: '/mock/holidayRecent7Days',
    method: "get"
  }, options)
}