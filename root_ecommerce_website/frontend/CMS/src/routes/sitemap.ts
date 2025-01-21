import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: '/',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
  {
    id: 'product',
    subheader: 'Product',
    icon: 'mingcute:box-fill',
    items: [
      {
        name: 'Add new product',
        pathName: 'add',
        path: `${paths.productRoot}/add`,
      },
      {
        name: 'View products',
        pathName: 'view',
        path: `${paths.productRoot}/view`,
      },
    ],
  },
  {
    id: 'brand',
    subheader: 'Brand',
    icon: 'mingcute:box-fill',
    items: [
      {
        name: 'Add new brand',
        pathName: 'add',
        path: `${paths.brandRoot}/add`,
      },
      {
        name: 'View brands',
        pathName: 'view',
        path: `${paths.brandRoot}/view`,
      },
    ],
  },
  {
    id: 'category',
    subheader: 'Category',
    icon: 'mingcute:tag-fill',
    items: [
      {
        name: 'Add new category',
        pathName: 'add',
        path: `${paths.categoryRoot}/add`,
      },
      {
        name: 'View categories',
        pathName: 'view',
        path: `${paths.categoryRoot}/view`,
      },
    ],
  },
  // {
  //   id: 'settings',
  //   subheader: 'Settings',
  //   path: '#!',
  //   icon: 'material-symbols:settings-rounded',
  //   active: true,
  // },
  // {
  //   id: 'template-pages',
  //   subheader: 'Template pages',
  //   path: '#!',
  //   icon: 'mingcute:document-2-fill',
  // },
  // {
  //   id: 'account-settings',
  //   subheader: 'John Carter',
  //   path: '#!',
  // },
];

export default sitemap;
