import {
  Table as VXETable,
  Column as VXEColumn,
} from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'xe-utils';

const components = [
  VXETable,
  VXEColumn
]

const vxeTable = {
  install(app) {
    components.forEach(comp => {
      app.use(comp)
    })
  }
}
export default vxeTable