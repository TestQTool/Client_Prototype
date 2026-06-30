/**
 * Employee API Page Object
 * Handles employee creation and management via API
 */

class EmployeeAPIPage {
  constructor(apiContext, baseURL) {
    this.apiContext = apiContext;
    this.baseURL = baseURL;
    this.employeeEndpoint = '/web/index.php/api/v2/pim/employees';
  }

  /**
   * Create a new employee via API
   * @param {Object} employeeData - Employee data object
   * @param {string} employeeData.firstName - First name
   * @param {string} employeeData.lastName - Last name
   * @param {string} employeeData.employeeId - Employee ID
   * @returns {Promise<Object>} API response
   */
  async createEmployee(employeeData) {
    const response = await this.apiContext.post(this.employeeEndpoint, {
      data: {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        employeeId: employeeData.employeeId
      }
    });
    return response;
  }

  /**
   * Verify employee creation response
   * @param {Object} response - API response object
   * @param {number} expectedStatus - Expected HTTP status code
   * @returns {Promise<Object>} Response body
   */
  async verifyEmployeeResponse(response, expectedStatus) {
    const status = response.status();
    const body = await response.json();
    
    return {
      status,
      body,
      isSuccess: status === expectedStatus
    };
  }

  /**
   * Check if response contains duplicate/conflict error
   * @param {Object} responseBody - Response body object
   * @returns {boolean} True if contains conflict error
   */
  containsConflictError(responseBody) {
    const responseText = JSON.stringify(responseBody).toLowerCase();
    return responseText.includes('conflict') || 
           responseText.includes('duplicate') || 
           responseText.includes('already exists') ||
           responseText.includes('employee id');
  }

  /**
   * Delete employee by ID (cleanup helper)
   * @param {string} employeeId - Employee ID to delete
   * @returns {Promise<Object>} API response
   */
  async deleteEmployee(employeeId) {
    const response = await this.apiContext.delete(`${this.employeeEndpoint}/${employeeId}`);
    return response;
  }
}

module.exports = { EmployeeAPIPage };

