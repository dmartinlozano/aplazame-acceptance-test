# Acceptance test

This project performs e2e test for https://demo.aplazame.com/

Project done by https://github.com/dmartinlozano

The used programming language is javascript (with es6) and the principal used technologies are:

* selenium-webdriver
* cucumber-js
* chai

## Preconditions

Install node https://nodejs.org/es/download/package-manager/

Later, install all libraries:
```
npm install
```

## Run tests with chrome
This is the default webbroser. Tested with version 67.0
```
export BROWSER=chrome
npm test
```

## Run tests with firefox
This is the default webbroser. Tested with version 60.0
```
export BROWSER=firefox
npm test
```

## Rest of web browsers
The variable ```BROWSER``` has this values:
* opera
* ie10
* ie8
* edge
* safari


## Reports
```
npm run report
```
The default webbrowser will open a html page with the results of the tests
