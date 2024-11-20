/* Copyright 2013-2016 VMware, Inc.   All rights reserved. -- VMware Confidential */

/**
 * Setting the resource for non-English locale.
 * By default en is always loaded in index.html
 */
var supportedLocales = [ "de", "es", "fr", "it", "ja", "ko", "zh" ];
var cLocale = navigator.language || navigator.userLanguage;

cLocale = cLocale.toLowerCase();

// Generate a pattern for all supported non-English locales.
pattern = '(' + supportedLocales.join('|') + ')' + '(-|\\b)';
var re = new RegExp(pattern, "i" );
if (re.test(cLocale)) {
   var langID;
   // Need special handling for Chinese simplified and traditional
   if (cLocale.indexOf("zh-tw") != -1 ||
      cLocale.indexOf("zh-hk") != -1 ||
      cLocale.indexOf("zh-hant") != -1) {
      langID = 'zh-TW';
   } else if(cLocale.indexOf("zh-cn") != -1 ||
      cLocale.indexOf("zh-hans") != -1 ||
      cLocale.indexOf("zh") != -1) { // default for chinese
      langID = 'zh-CN';
   } else {
      langID = cLocale.substr(0,2);
   }

   document.write('<script type="text/javascript" src="./' + langID
      + '/welcomeRes.js"> </script>');
}