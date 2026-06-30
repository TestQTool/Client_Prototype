export const leaveTestData = {
  testCase764: {
    testCaseId: '764',
    title: 'Leave Module',
    type: 'Feature',
    priority: 'high',
    tags: ['@priority:high', '@testcase:764'],
    leaveTypes: [
      'Annual Leave',
      'Sick Leave',
      'Casual Leave',
      'Maternity Leave',
      'Paternity Leave'
    ],
    sampleLeaveRequest: {
      leaveType: 'Annual Leave',
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      reason: 'Personal vacation'
    }
  }
};
