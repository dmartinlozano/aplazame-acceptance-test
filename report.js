var reporter = require('cucumber-html-reporter');
var cucumberJunit = require('cucumber-junit');
var fs = require('fs');
var path = require('path');
var reports = "reports";
var screenshots = "screenshots";

generateReport = function(fileWithoutExtension){
    // generate the HTML report
    var reportOptions = {
        theme: 'bootstrap',
        jsonFile: path.resolve(reports, fileWithoutExtension + '.json'),
        output: path.resolve(reports, fileWithoutExtension + '.html'),
        reportSuiteAsScenarios: true,
        launchReport: true,
        ignoreBadJsonFile: true,
        screenshotsDirectory: screenshots,
        storeScreenshots: true
    };

    reporter.generate(reportOptions);

    //fix to show html page
    fs.readFile(path.resolve(reports, fileWithoutExtension + '.html'), 'utf8', function (err,data) {
      var result = data.replace(/.info {/g, '.info { width: 1222px;');
      fs.writeFile(path.resolve(reports, fileWithoutExtension + '.html'), result, 'utf8', function (){});
    });

    // grab the file data
    var reportRaw = fs.readFileSync(path.join(reports,fileWithoutExtension+".json")).toString().trim();
    var xmlReport = cucumberJunit(reportRaw);
    fs.unlink(path.join(reports,fileWithoutExtension+".xml"),function(){});
    fs.writeFile(path.join(reports,fileWithoutExtension+".xml"), xmlReport, {flag:'wx'},function(){});
};

fs.readdir(reports, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".json")){
      try{
        generateReport(file.slice(0, -5));
      } catch (e){
        console.error(e);
      }
    };
  });
});
