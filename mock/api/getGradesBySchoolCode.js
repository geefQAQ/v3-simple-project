import Mock from 'mockjs';

const Random = Mock.Random;

let List = []
for(let i = 0; i < Random.integer(5, 10); i++) {
  const Late = Random.integer(0, 20);
  const Absent = Random.integer(0, 20);
  const Holiday = Random.integer(0, 20);
  const Actually = Random.integer(0, 20);
  const Call =  `${Random.integer(0, 3)} / 3`;// TODO: 点名情况，字段名具体看接口
  const Total = Late + Absent + Holiday + Actually;
  const Rate = Math.ceil((Actually / Total * 100)) + '%';
  List.push({
    GradeId: Random.id(),
    GradeName: Random.pick(['一', '二', '三', '四', '五', '六']) + '年级',
    Late,
    Absent,
    Holiday,
    Total,
    Actually,
    Call,
    Rate
  })
}

export default {
  SchoolCode: Random.id(),
  List
}