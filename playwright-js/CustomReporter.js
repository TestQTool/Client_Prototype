class CustomReporter {
  onBegin(config, suite) {
    console.log(`Starting test run with ${suite.allTests().length} tests`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test: ${test.title} - ${result.status}`);
  }

  onEnd(result) {
    console.log(`Test run finished with status: ${result.status}`);
  }
}

export default CustomReporter;

