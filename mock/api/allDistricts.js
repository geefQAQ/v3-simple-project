import Mock from 'mockjs';
const Random = Mock.Random;

let data = []
for(let i = 0; i < Mock.mock('@integer(1, 10)'); i++) {
  data.push({
    id: Random.increment(),
    name: Random.county()
  })
}
export default data;