import Mock from 'mockjs';

const Late =  Mock.mock('@integer(0, 10)');
const Absent =  Mock.mock('@integer(0, 10)');
const Holiday =  Mock.mock('@integer(0, 10)');
const Actually =  Mock.mock('@integer(30, 50)');
const Total = Late + Absent + Holiday + Actually;
const Rate = (Actually / Total).toFixed(2) * 100 + '%';

export default {
  Late,
  Absent,
  Holiday,
  Total,
  Actually,
  Rate,
}