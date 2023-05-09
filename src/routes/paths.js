// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    encodedecode: path(ROOTS_DASHBOARD, '/encode-decode'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
 
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    addUser: path(ROOTS_DASHBOARD, '/user/add-user'),
    editUser: path(ROOTS_DASHBOARD, '/user/edit-user'),
    currentUsers: path(ROOTS_DASHBOARD, '/user/current-users'),
  },
  articles: {
    root: path(ROOTS_DASHBOARD, '/articles'),
    currentArticles: path(ROOTS_DASHBOARD, '/articles/current-articles'),
    addArticles: path(ROOTS_DASHBOARD, '/articles/add-articles'),
    editArticles: path(ROOTS_DASHBOARD, '/articles/edit-articles'),
  },
};