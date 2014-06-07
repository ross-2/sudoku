require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery'
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





