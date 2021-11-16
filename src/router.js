import { createRouter, createWebHistory } from 'vue-router';
import Example1 from '@/pages/example1.vue';
import Example2 from '@/pages/example2.vue';
import Example3 from '@/pages/example3.vue';
import Example4 from '@/pages/example4.vue';
import EditFunction from '@/pages/EditFunction.vue';
import Manage from '@/pages/manage.vue';

const configs = [
  {
    path: '/', // 路由地址，children 内路由地址 = 上一嵌套的路由地址（若无则为""） + 该path
    label: '首页', // 【必选】显示在菜单栏里的名字
    name: 'one', // 【必选】一定要有，且保证在 configs 内唯一
    icon: 'el-icon-s-comment', // 显示在菜单栏内的 icon
    component: Example1 // 页面组件
  },
  {
    path: '/a',
    label: '监测信息',
    icon: 'el-icon-s-opportunity',
    name: 'second',
    component: Example2,
  },
  {
    path: '/b',
    label: '用水用电统计',
    icon: 'el-icon-s-data',
    name: 'three',
    component: Example3,
  },
  {
    path: '/c',
    label: '一张图',
    icon: 'el-icon-map-location',
    name: 'four',
    component: Example4,
  },
  {
    path: '/manage',
    label: '用户类型管理',
    icon: 'el-icon-map-location',
    name: 'manage',
    hide: true,
    component: Manage
  },
  {
    path: '/manage/edit',
    label: '用户类型权限管理',
    icon: 'el-icon-map-location',
    name: 'manageEdit',
    component: EditFunction
  }
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
