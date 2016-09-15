({
    onResourcesLoaded: function(cmp, event, helper) {
        helper.debugLog(cmp, 'onResourcesLoaded');
        helper.checkLibConflicts();

        var searchbox = cmp.find('StandaloneSearchbox');
        searchbox.set('v.name', cmp.get('v.name'));
        searchbox.set('v.autoInjectBasicQuery', false);
        searchbox.set('v.autoInitialize', false);
        searchbox.set('v.autoInjectBasicOptions', true);
        searchbox.set('v.debug', cmp.get('v.debug'));
        searchbox.set('v.searchHub', cmp.get('v.searchHub'));

    },
    onInterfaceContentLoaded: function(cmp, event, helper) {
        helper.debugLog(cmp, 'onInterfaceContentLoaded');
        var name = cmp.get('v.name');
        var searchUrl = 'coveosearch';
        var searchHub = cmp.get('v.searchHub');

        helper.initializeInterface(cmp, name, searchHub, searchUrl);

    }
})