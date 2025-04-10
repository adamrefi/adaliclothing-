import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '667'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'cf5'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'd07'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '698'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/developer/backend/',
                component: ComponentCreator('/docs/developer/backend/', '992'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/developer/backend/backendtest',
                component: ComponentCreator('/docs/developer/backend/backendtest', '084'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/developer/backend/routes',
                component: ComponentCreator('/docs/developer/backend/routes', '060'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/developer/frontend/fronttest',
                component: ComponentCreator('/docs/developer/frontend/fronttest', 'ffe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/developer/frontend/overview',
                component: ComponentCreator('/docs/developer/frontend/overview', '608'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
