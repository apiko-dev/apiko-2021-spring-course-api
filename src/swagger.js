import configs from 'configs';

export default {
  routePrefix: '/documentation',
  openapi: {
    info: {
      title: 'Apiko 2021 spring courses API',
      description: 'API for Apiko 2021 spring courses',
      version: '0.1.0',
    },
    servers: [{ url: configs.url }],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  exposeRoute: true,
  uiConfig: {
    defaultModelExpandDepth: 3,
    defaultModelRendering: 'model',
  },
};
