export const SCHOOL_TABLE_COLUMNS = [
  { field: 'SchoolName', title: '学校名称', width: '30%'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
];

export const GRADE_TABLE_COLUMNS = [
  { field: 'GradeName', title: '年级', width: '15%' },
  { field: 'Total', title: '应到', width: '15%' },
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
  { field: 'Call', title: '点名情况'},
];

export const CLASS_TABLE_COLUMNS = [
  { field: 'ClassName', title: '班级', width: '18%' },
  { field: 'Total', title: '应到', width: '15%' },
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤', width: '20%'},
  { field: 'IsCalled', title: '已点名', custom: true},
];

export const STATUS_OBJ = {
  holiday: '请假',
  late: '迟到',
  absent: '缺勤',
  normal: '正常',
}

export const COLORS_OBJ = {
  holiday: '#5470c6',
  late: '#fac858',
  absent: '#ee6666',
  normal: '#91cc75',
  all: '#73c0de'
}

export const SCREEN_WIDTH = document.documentElement.clientWidth;