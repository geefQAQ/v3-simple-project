import Mock from 'mockjs';
import dayjs from 'dayjs';

const Recent7Days = [
  dayjs().subtract(6, 'day').format("MM/DD"),
  dayjs().subtract(5, 'day').format("MM/DD"),
  dayjs().subtract(4, 'day').format("MM/DD"),
  dayjs().subtract(3, 'day').format("MM/DD"),
  dayjs().subtract(2, 'day').format("MM/DD"),
  dayjs().subtract(1, 'day').format("MM/DD"),
  dayjs().subtract(0, 'day').format("MM/DD"),
]

const Data = [
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
  Mock.mock('@integer(0, 40)'),
]

export default {
  Recent7Days,
  Data,
}