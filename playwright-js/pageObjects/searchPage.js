// Search Page Object - Locators Only
// Feature: Product Search

export const searchPageLocators = {
  // Search Bar Elements
  searchInput: 'input[type="search"], input[placeholder*="Search"], input[name="search"], #search-input, [data-testid="search-input"]',
  searchButton: 'button[type="submit"], button:has-text("Search"), [aria-label="Search"], #search-button, [data-testid="search-button"]',
  searchBarContainer: '[role="search"], .search-container, #search-bar',
  searchPlaceholder: 'input[placeholder]',

  // Search Results Elements
  searchResults: '.search-results, #search-results, [data-testid="search-results"]',
  resultItems: '.product-item, .search-result-item, [data-testid="product-item"]',
  noResultsMessage: ':has-text("No Results Found"), .no-results, [data-testid="no-results"]',
  productName: '.product-name, .product-title, h3, [data-testid="product-name"]',
  productPrice: '.product-price, .price, [data-testid="product-price"]',
  productDescription: '.product-description, .description, [data-testid="product-description"]',

  // Page Elements
  homepage: '/',
  productListingPage: '/products, /shop',
  productDetailPage: '/product/',

  // Performance Testing Elements
  loadingSpinner: '.loading, .spinner, [data-testid="loading"]',
  resultsContainer: '.results-container, #results'
};

