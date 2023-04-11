export const TABLE_COLUMNS = [
  { field: 'SchoolName', title: '学校名称'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
];
export const COLORS = {
  holiday: '#5470c6',
  late: '#fac858',
  absent: '#ee6666',
  normal: '#91cc75',
  all: '#73c0de'
}

export const SCREEN_WIDTH = document.documentElement.clientWidth;