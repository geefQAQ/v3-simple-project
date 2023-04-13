import refreshToken from './refreshToken'; // 刷新token
import gettownaccess from './gettownaccess'; // 学校列表
import attendanceToday from './attendanceToday';
import attendanceRecent7Days from './attendanceRecent7Days';
import holidayOverview from './holidayOverview';
import holidayRecent7Days from './holidayRecent7Days';
import allDistricts from './allDistricts';
import schoolsByDistrict from './schoolsByDistrict';
// import getaccess from './getaccess'; // 年级列表
import getGradesBySchoolCode from './getGradesBySchoolCode'; // 年级列表
import getClassesByGradeId from './getClassesByGradeId'; // 班级列表
import getStudentsByClassId from './getStudentsByClassId'; // 学生列表

export {
  refreshToken,
  gettownaccess,
  attendanceToday,
  attendanceRecent7Days,
  holidayOverview,
  holidayRecent7Days,
  allDistricts,
  schoolsByDistrict,
  getGradesBySchoolCode,
  getClassesByGradeId,
  getStudentsByClassId
}