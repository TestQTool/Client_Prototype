// Search API Page Object - API Endpoint References
// Feature: Product Search API

export const searchApiEndpoints = {
  // API Endpoints
  searchEndpoint: '/api/search',
  productsEndpoint: '/api/products',
  
  // Query Parameters
  keywordParam: 'keyword',
  queryParam: 'q',
  
  // Expected Response Fields
  responseFields: {
    products: 'products',
    results: 'results',
    data: 'data',
    name: 'name',
    price: 'price',
    description: 'description'
  },
  
  // Expected Headers
  contentTypeHeader: 'content-type',
  authorizationHeader: 'authorization',
  
  // Status Codes
  statusCodes: {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    tooManyRequests: 429
  }
};

