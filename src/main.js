import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'xe-utils';
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Icon,
  Circle,
  Col,
  Row,
  Collapse,
  CollapseItem,
  Toast,
  Popup,
  DatetimePicker,
  Picker,
  Field,
  Dialog,
  Tab,
  Tabs,
  Tag,
  Space,
} from 'vant';

import {
  Table as VXETable,
  Column as VXEColumn,
} from 'vxe-table';

import 'vant/es/toast/style';
import 'vant/lib/index.css';
import './assets/main.css';
import 'vxe-table/lib/style.css'
import "amfe-flexible/index.js";

const app = createApp(App);

// function useTable (app) {
//   app.use(Table)
// }
// 3. 注册你需要的组件
app
  .use(Button).use(NavBar).use(Cell).use(CellGroup).use(Icon)
  .use(Circle).use(Col).use(Row).use(Collapse).use(CollapseItem)
  .use(Toast).use(Popup).use(DatetimePicker).use(Picker).use(Field).use(Dialog).use(Tag).use(Space)
  .use(Tab).use(Tabs);

app.use(VXETable).use(VXEColumn);
app.use(router);

app.mount('#app');
