// 引用模板
var baseUrl = '';
import index from '../page/index.vue'
import login from '../page/login.vue'
import register from '../page/register.vue'
import manage from '../page/manage.vue'
import detail from '../page/detail.vue'

/** 导入各个模块 */
import userManage from '../page/modules/userManage/userManage.vue'
import password from '../page/modules/password/password.vue'
import invitation from '../page/modules/invitation/invitation.vue'
import createSupplyInfor from '../page/modules/createSupplyInfor/createSupplyInfor'
import manageSupplyInfor from '../page/modules/manageSupplyInfor/manageSupplyInfor'
import coverManage from '../page/modules/cover/cover.vue'
import manageSubcribInfor from '../page/modules/manageSubcribInfor/manageSubcribInfor.vue'


// 配置路由
export default [
  {
    path: '/',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  },
  {
    name: 'detail',
    path: '/detail',
    component: detail
  },
  {
    path: '/manage',
    component: manage,
    children:[{
      path: 'userManage',
      component: userManage
    },{
      path: 'password',
      component: password
    },{
      path: 'invitation',
      component: invitation
    },{
      path: 'manageSupplyInfor',
      component: manageSupplyInfor
    },{
      path: 'manageDemandedInfor',
      component: manageSupplyInfor
    },{
      path: 'createSupplyInfor',
      component: createSupplyInfor
    },{
      path: 'createDemandedInfor',
      component: createSupplyInfor
    },{
      path: 'coverManage',
      component: coverManage
    },{
      path: 'manageSubcribInfor',
      component: manageSubcribInfor
    }]
  }
]
