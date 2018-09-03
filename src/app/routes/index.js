import Article from '../containers/Article';

const routes = [
  {
    path: '/news/articles/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/news/articles/amp/:id',
    exact: true,
    component: Article,
  },
];

export default routes;
