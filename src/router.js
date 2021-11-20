import { createRouter, createWebHistory } from 'vue-router';
import homepage from '@/pages/homePage/homepage.vue';
import MapContent from '@/pages/Map/mapcontent.vue';
import MapDetail from '@/pages/Map/mapdetail.vue';
import AlarmMgmt from '@/pages/AlarmMgmt/alarmMgmt.vue'
import VPInformation from '@/pages/ValvePlugInformation/valve_plug_information.vue'
import async from "async";


 const configs = [
  {
    path: '/', // 路由地址，children 内路由地址 = 上一嵌套的路由地址（若无则为""） + 该path
    label: '首页', // 【必选】显示在菜单栏里的名字
    name: 'homepage', // 【必选】一定要有，且保证在 configs 内唯一
    icon: 'el-icon-s-comment', // 显示在菜单栏内的 icon
    component: homepage // 页面组件
  },
  {
    path: '/map',
    label: '一张图',
    icon: 'el-icon-s-opportunity',
    name: 'map',
    children:[
      {
        path:'/content',
        label:'内容',
        component: MapContent
      },
      {
        path:'/detail',
        label:'详情',
        component: MapDetail
      }
    ]
  },
  {
    path: '/valve_plug_information',
    label: '阀栓信息',
    name: 'valve_plug_information',
    icon: '',
    component: VPInformation
  },
  {
    path: '/alarm_management',
    label: '报警管理',
    name: 'alarm_management',
    icon: '',
    component: AlarmMgmt
  },
  {
    path: '/comprehensive_statistics',
    label: '综合统计',
    name: 'comprehensive_statistics',
    icon: '',
    component: ""
  },
  {
    path: '/water_consumption_statistics',
    label: '用水统计',
    name: 'water_consumption_statistics',
    icon: '',
    component: ""
  },
  {
    path: '/water_consumption_statistics',
    label: '统计报表',
    name: 'water_consumption_statistics',
    icon: '',
    children: [
      {
        path:'/district',
        label:'区县',
        component: ""
      },
      {
        path:'/township',
        label:'乡镇',
        component: ""
      },
      {
        path:'/village',
        label:'村庄',
        component: ""
      },
      {
        path:'/industrial_area',
        label:'工业区',
        component: ""
      },
    ]
  },
  {
    path: '/system_management',
    label: '系统管理',
    name: 'system_management',
    icon: '',
    children: [
      {
        path:'/user_anagement',
        label:'用户管理',
        component: ""
      },
      {
        path:'/job_management',
            label:'岗位管理',
          component: ""
      },
      {
        path:'/menu_management',
        label:'菜单管理',
        component: ""
      },
      {
        path:'/api_management',
        label:'API管理',
        component: ""
      }
    ]
  },
];

const generateRouterConfigsFunc = (res, configs, { rootPath = '' }) => {
  configs.forEach(item => {
    const path = rootPath + (item.path || '');
    if (item.component && (!item.children || item.children.length === 0)) {
      res.push({
        name: item.name,
        path,
        component: item.component,
      });
    }
    if (item.children && item.children.length > 0) {
      generateRouterConfigsFunc(res, item.children, { rootPath: path });
    }
  })
}

const generateMenuConfigsFunc = (res, configs, { rootPath = '' }) => {
  configs.forEach(item => {
    const path = rootPath + (item.path || '');
    if (!item.hide) {
      const children = [];
      if (item.children && item.children.length > 0) {
        generateMenuConfigsFunc(children, item.children, {
          rootPath: path
        });
      }
      res.push({
        name: item.name,
        label: item.label,
        icon: item.icon,
        children,
        index: path,
      });
    }
  })
}

const generateMenuExpandedConfigsFunc = (res, configs) => {
  configs.forEach(item => {
    if (item.expanded) {
      res.push(item.name)
    }
    if (item.children && item.children.length > 0) {
      generateMenuExpandedConfigsFunc(res, item.children);
    }
  })
}

const generateFuncListFunc = (res, configs) => {
  configs.forEach(item => {
    if (item.component) {
      res.push({
        name: item.name,
        label: item.label
      })
    }
    if (!item.component && item.children && item.children.length > 0) {
      generateFuncListFunc(res, item.children);
    }
  })
}

const generate = (configs, genFunc) => {
  const res = [];
  genFunc(res, configs, {});
  return res;
};

export const generateRouterConfigs = (configs) => generate(configs, generateRouterConfigsFunc);
export const generateMenuConfigs = (configs) => generate(configs, generateMenuConfigsFunc);
export const generateMenuExpandedConfigs = (configs) => generate(configs, generateMenuExpandedConfigsFunc);
export const generateFuncListConfigs = (configs) => generate(configs, generateFuncListFunc);

export const routerConfigs = generateRouterConfigs(configs)
export const menuConfigs = generateMenuConfigs(configs)
export const menuExpandedConfigs = generateMenuExpandedConfigs(configs)
export const funcListConfigs = generateFuncListConfigs(configs)

export const router = createRouter({
  history: createWebHistory(),
  routes: routerConfigs,
});
