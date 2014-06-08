require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    hbs: '../bower_components/require-handlebars-plugin/hbs'
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}
