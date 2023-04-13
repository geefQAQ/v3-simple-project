import Mock from 'mockjs';

const HolidayPrivateAffair = Mock.mock('@integer(0, 30)');
const HolidaySick = Mock.mock('@integer(0, 30)');
const HolidayOther = Mock.mock('@integer(0, 30)');
const HolidayTotal = HolidayPrivateAffair + HolidaySick + HolidayOther;

export default {
  HolidayTotal,
  HolidayPrivateAffair,
  HolidaySick,
  HolidayOther
}