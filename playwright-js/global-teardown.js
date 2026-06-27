import fs from 'fs';
import path from 'path';
//import { sendTestResults } from './utils/sendEmail.js';
import {startTime} from "./playwright.config";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export default async () => {
    // await delay(10000);
    try{


    // const htmlReportPath = path.resolve(`./playwright-report/index.html`);
    // const reportPath = path.resolve(`./test-report/playwright-report.json`);
    // // if (!fs.existsSync(reportPath)) {
    // //     throw new Error('Report file not found at: ' + reportPath);
    // // }
    // const rawData = fs.readFileSync(reportPath);
    // const summary = JSON.parse(rawData);
    // //
    // //
    // const totalTests = summary.stats.expected + summary.stats.unexpected + summary.stats.skipped;
    // const passed = summary.stats.expected;
    // const failed = summary.stats.unexpected;
    // const skipped = summary.stats.skipped;
    //
    // const browserStats = {};
    // summary.config.projects.forEach(project => {
    //     browserStats[project.name] = {
    //         passed: 0,
    //         failed: 0,
    //         skipped: 0
    //     };
    // });
    //
    // summary.suites.forEach(suite => {
    //     suite.specs.forEach(spec => {
    //         spec.tests.forEach(test => {
    //             const browserName = test.projectName;
    //             test.results.forEach(result => {
    //                 if (result.status === "passed") {
    //                     browserStats[browserName].passed++;
    //                 } else if (result.status === "failed") {
    //                     browserStats[browserName].failed++;
    //                 } else if (result.status === "skipped") {
    //                     browserStats[browserName].skipped++;
    //                 }
    //             });
    //         });
    //     });
    // });
    //
    // const emailSummary = {
    //     totalTests,
    //     passed,
    //     failed,
    //     skipped,
    //     browserStats
    // };
    //
    // console.log('Generated Email Summary:', emailSummary);
    //
    // await sendTestResults(htmlReportPath,emailSummary);
    }
    catch (error){
        console.error(error);
    }
};
