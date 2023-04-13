import Mock from 'mockjs';

const Random = Mock.Random;

const Grade = Random.natural(1, 6);
const GradeName = `${Grade}年级`;
const ClassName = `${Grade}0${Random.natural(1, 10)}班`;

const Late = Random.integer(0, 20);
const Absent = Random.integer(0, 20);
const Holiday = Random.integer(0, 20);
const Actually = Random.integer(0, 20);
const Total = Late + Absent + Holiday + Actually;
const Rate = Math.ceil((Actually / Total * 100)) + '%';

const randomStatus = () => {
  const statusArr = ['正常', '迟到', '请假', '缺勤']
  const _index = Math.floor(Math.random() * statusArr.length);
  const _status = statusArr[_index];
  let IsNormal, IsLate, IsHoliday, IsAbsent;
  switch (_status) {
    case '正常':
      IsNormal = true;
      IsLate = IsHoliday = IsAbsent = false;
      break;
    case '迟到':
      IsLate = true;
      IsNormal = IsHoliday = IsAbsent = false;
      break;
    case '请假':
      IsHoliday = true;
      IsNormal = IsLate = IsAbsent = false;
      break;
    case '缺勤':
      IsAbsent = true;
      IsNormal = IsLate = IsHoliday = false;
      break;
    default:
      break;
  }
  return {
    IsNormal,
    IsLate,
    IsHoliday,
    IsAbsent
  }
}
let List = [];
for(let i = 0; i < Random.integer(40, 50); i++) {
  const {
    IsNormal,
    IsLate,
    IsHoliday,
    IsAbsent } = randomStatus();
  List.push({
    ClassId: Random.id(),
    StudentName: Random.cname(),
    IsNormal,
    IsLate,
    IsHoliday,
    IsAbsent,
  })
}

export default {
  GradeName,
  ClassName,
  Late,
  Absent,
  Holiday,
  Actually,
  Total,
  Rate,
  List
}