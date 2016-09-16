public with sharing class CoveoStandaloneSearchbox {
@AuraEnabled
  public static string getToken(String searchHub) {
    Map<String, Object> params = new Map<String,Object> {
      'filter' => null,
      'searchHub' => searchHub,
      'userGroups' => null,
      'additionnalUserIdentities' => null
    };
      
    return JSON.serialize(new Map<String,String> {
        'token' => CoveoV2.Globals.generateSearchToken(params)
    });
  }
}
