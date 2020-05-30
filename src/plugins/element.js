import Vue from 'vue'
// 全部导入
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI)
// Vue.component('el-button',xxxx)
// Vue.component('el-form',xxxx)
// Vue.component('el-table',xxxx)
// ...

// 按需导入
import {
  Form,
  FormItem,
  Input,
  Button,
  Icon,
  Row,
  Col,
  Checkbox,
  Link,
  Message,
  Dialog,
  Upload,
  Header,
  Main,
  Aside,
  Container,
  Menu,
  MenuItem,
  Card,
  Select,
  Option,
  MessageBox,
  Table,
  TableColumn,
  Pagination,
  DatePicker,
  Cascader,
  Radio,
  RadioGroup
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Radio)
Vue.use(RadioGroup)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm