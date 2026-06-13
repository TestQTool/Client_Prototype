class CustomReporter {
  onBegin(config, suite) {
    console.log(`Starting test execution with ${suite.allTests().length} tests`);
  }

  onTestEnd(test, result) {
    console.log(`Test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`Test execution completed: ${result.status}`);
  }
}

module.exports = CustomReporter;

