import Mock from 'mockjs';

const Random = Mock.Random;

let List = []
for(let i = 0; i < Random.integer(5, 10); i++) {
  const Late = Random.integer(0, 20);
  const Absent = Random.integer(0, 20);
  const Holiday = Random.integer(0, 20);
  const Actually = Random.integer(0, 20);
  const IsCalled =  Random.boolean();// TODO: 已点名，字段名具体看接口
  const Total = Late + Absent + Holiday + Actually;
  const Rate = Math.ceil((Actually / Total * 100)) + '%';
  List.push({
    ClassId: Random.id(),
    ClassName: `${Random.natural(1, 6)}0${Random.natural(1, 10)}班`,
    Late,
    Absent,
    Holiday,
    Total,
    Actually,
    IsCalled,
    Rate
  })
}

export default {
  SchoolCode: Random.id(),
  List
}