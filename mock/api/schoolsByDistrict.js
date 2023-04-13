import Mock from 'mockjs';
const Random = Mock.Random;

let data = []
for(let i = 0; i < Random.integer(1, 10); i++) {
  const Late = Random.integer(0, 40);
  const Absent = Random.integer(0, 40);
  const Holiday = Random.integer(0, 40);
  const Actually = Random.integer(0, 40);
  const Total = Late + Absent + Holiday + Actually;
  data.push({
    SchoolCode: Random.id(),
    SchoolName: Random.county() + Random.pick(['中', '小']) + '学',
    Late,
    Absent,
    Holiday,
    Total,
    Actually
  })
}
export default data;