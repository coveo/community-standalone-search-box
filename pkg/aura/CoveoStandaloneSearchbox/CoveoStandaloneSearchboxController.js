({
  onScriptLoaded: function (cmp, event, helper) {
    var name = cmp.get('v.name');
    var searchHub = cmp.get('v.searchHub');
    var searchUrl = cmp.get('v.searchUrl');

    var getInitializationAction = cmp.get('c.getToken');

    getInitializationAction.setParams({
      searchHub: searchHub
    });

    getInitializationAction.setCallback(this, function (initializationResponse) {
      var parsed = JSON.parse(initializationResponse.returnValue);

      if (window.location.pathname.indexOf(searchUrl) < 0) {
        Coveo.SearchEndpoint.endpoints[name] = new Coveo.SearchEndpoint({
          restUri: 'https://cloudplatformdev.coveo.com/rest/search/',
          accessToken: parsed.token
        });

        Coveo.$("#standaloneSearchbox").coveo('options', {
          StandaloneSearchInterface: {
            endpoint: Coveo.SearchEndpoint.endpoints[name]
          }
        });
        Coveo.$("#standaloneSearchbox").coveo('initSearchbox', searchUrl);
      } else {
        var executeWhenSearchInterfaceIsLoaded = function (callback) {
          if ($('.CoveoSearchInterface').length == 0) {
            setTimeout(function () {
              executeWhenSearchInterfaceIsLoaded(callback);
            }, 10)
          } else {
            callback();
          }
        }

        executeWhenSearchInterfaceIsLoaded(function () {
          $('.CoveoSearchInterface').coveo('init', {
            externalComponents: [$('#standaloneSearchbox').get(0)]
          });
        });
      }
    });

    $A.enqueueAction(getInitializationAction);
  }
})