({
    getSearchInterface: function(cmp) {
        cmp.helper.debugLog(cmp, 'getSearchInterface');
        var searchInterface = Coveo.$('#search');

        return searchInterface;
    },

    getSearchBox: function(cmp) {
        cmp.helper.debugLog(cmp, 'getSearchBox');
        var searchbox = cmp.find('StandaloneSearchbox');
        var searchInterface = Coveo.$('#standaloneSearchbox');
        if (!searchInterface || searchInterface.length == 0) {
            searchInterface = Coveo.$(Coveo.$(searchbox).children).first();
        }
        return searchInterface;
    },

    initializeInterface: function(cmp, name, searchHub, searchUrl) {
        cmp.helper.debugLog(cmp, 'initializeInterface');
        var standaloneSearchbox = cmp.getConcreteComponent().helper.getSearchBox(cmp);
        standaloneSearchbox.on('newQuery', function(e, data) {
            cmp.helper.debugLog(cmp, 'newQuery');
            var q = standaloneSearchbox.coveo('state', 'q');
            if (!Coveo.Utils.isNullOrEmptyString(q)) {
                var input = standaloneSearchbox.find('input').val();
                standaloneSearchbox.coveo('state', 'q', input);

                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": searchUrl + '#q=' + encodeURIComponent(q)
                });
                urlEvent.fire();
            }
            data.cancel=true;
        });

        cmp.getConcreteComponent().helper.executeInitialization(cmp, searchUrl);

    },
    executeInitialization: function(cmp, searchUrl) {
        cmp.helper.debugLog(cmp, 'executeInitialization');
        debugger;
        var standaloneSearchbox = cmp.getConcreteComponent().helper.getSearchBox(cmp);
        
        var executeWhenSearchInterfaceIsLoaded = function(callback) {
            debugger;
            if($('.CoveoSearchInterface').length == 0) {
                setTimeout(function() {
                    executeWhenSearchInterfaceIsLoaded(callback);
                }, 200)
            } else {
                debugger;
                callback();
            }
        }
        var initializeSearchPage = function() {
            $('.CoveoSearchInterface').coveo('init', {
                externalComponents: [standaloneSearchbox]
            });
        }

        if(window.location.pathname.indexOf(searchUrl) < 0) {
            standaloneSearchbox.coveo('initSearchbox', searchUrl);
        } else {
             executeWhenSearchInterfaceIsLoaded(initializeSearchPage);
        }
        Coveo.$(document).trigger('StandaloneSearchboxLoaded');

    },

    attributeIsTrueOrTruthy: function(attribute) {
        return attribute && (attribute === true || attribute.toLowerCase() === 'true');
    },
    checkLibConflicts: function() {
        // The lightning framework / community builder uses an older version of underscore which breaks our stuff
        // Coveo._copy will save a copy of the right version of underscore
        // This is useful if there is multiple coveo component in the same page load
        if (Coveo._ == undefined || Coveo._.VERSION != "1.6.0") {
            console.log("Found conflicting version of underscore");
            if (Coveo._copy && Coveo._copy.VERSION == "1.6.0") {
                Coveo._ = Coveo._copy;
            } else if (_ && _.noConflict) {
                Coveo._ = _.noConflict();
            }
            //Forcing Lightning framework to use Coveo underscore version
            _ = Coveo._;
        } else if (Coveo._ != undefined && Coveo._.VERSION == '1.6.0' && Coveo._copy == undefined) {
            Coveo._copy = Coveo._;
        }
    },
    // Log messages if the component is in debug mode.
    debugLog: function(cmp, message) {
        if (cmp.helper.attributeIsTrueOrTruthy(cmp.get('v.debug'))) {
            console.log('StandaloneSearchbox >>> ' + message);
        }
    }
})