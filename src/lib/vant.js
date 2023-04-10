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
  Divider,
} from 'vant';
import 'vant/es/toast/style';
import 'vant/lib/index.css';

const components = [
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
  Divider,
]
const vant = {
  install(app) {
    components.forEach(comp => app.use(comp));
  }
}

export default vant;