export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pagesRoot}/dashboard`,
  productRoot: `/${rootPaths.pagesRoot}/product`,
  brandRoot: `/${rootPaths.pagesRoot}/brand`,
  categoryRoot: `/${rootPaths.pagesRoot}/category`,
  settings: `/${rootPaths.pagesRoot}/settings`,
  templatePages: `/${rootPaths.pagesRoot}/template-pages`,
  accountSettings: `/${rootPaths.pagesRoot}/account-settings`,

  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  comingSoon: `/coming-soon`,
  404: `/${rootPaths.errorRoot}/404`,
};
