module.exports = function(config) {
  config.set({
    basePath: './tests',
    frameworks: ['jasmine', 'parcel'],
    files: [
      { pattern: '*.spec.js', watched: false, included: false },
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-parcel'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter')
    ],
    preprocessors: {
      '**/*.js': 'parcel'
    },
    client: {
      captureConsole: true,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
