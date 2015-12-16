# Epiphany Require Modules

A selection of useful _require.js_ modules can be found in the _src/js/ep_ directory. Please list and document any module you have written here.

Make sure you are familiar with the way that AMD works (http://requirejs.org/docs/whyamd.html is a good place to start) and have a poke around some of the module code

## belowfold.js

## distance.js

## get-url-vars.js

## google-data.js
### Author: Chris Marsh (@chris_marsh)

The Google Data module allows you to query a Google Document and returns the data contained in it. It's useful for managing content. You can set up the content any way you want and the research or copy team can input data diretly in to the Google Doc. Additionally, any updates to the data can be done without needing to update the client's site.

To use it, include `ep/google-data.js` as a dependency:

```js
define(["jquery", "ep/google-data"], function($, GoogleData) {
  ...
});
```

To load the data, make a `new` GoogleData object using the Google Doc ID. You can find the ID in the URL of the doc (e.g. https://docs.google.com/a/epiphanysolutions.co.uk/spreadsheets/d/172DBKMoMktUy76Gx9K7odPEf-DWpPuw7ZJ6zftNIQ2o/edit#gid=0 gives the ID *172DBKMoMktUy76Gx9K7odPEf-DWpPuw7ZJ6zftNIQ2o*). You must then call the `fetchData` mathod, passing either an object with a `success` and `error` callback function, or a single function used for both success and failure.

```js
  var data = new GoogleData("172DBKMoMktUy76Gx9K7odPEf-DWpPuw7ZJ6zftNIQ2o");

  // Then call fetchData either with a success/error object...
  data.fetchData({
    success:addData,
    error:showError
  });

  // Or with a single function for both
  //data.fetchData(addData);
```

On success, the module returns an array. Each item in the array represents a tab in the Google Doc, which is an object consisting of a "title" property (the title of the tab) and a "rows" property, which will be an array of objects, with each object representing a row. The object's properties will be a normalised version of column headers. So the following table:

###Presidents
| First Name | Last Name  | Date of Birth |
|------------|------------|---------------|
| Abraham    | Lincoln    | 12/02/1809    |
| George     | Washington | 22/02/1732    |
| Barack     | Obama      | 04/08/1961    |

###Beatles
| First Name | Last Name  | Date of Birth |
|------------|------------|---------------|
| John       | Lennon     | 09/10/1940    |
| Paul       | McCartney  | 18/06/1942    |
| George     | Harrison   | 25/02/1943    |

Creates the following object:

```json
[
  {
    "title": "Presidents",
    "rows":[
      {
        "first-name":"Abraham",
        "last-name":"Lincoln",
        "date-of-birth":"12/02/1809"
      },{
        "first-name":"George",
        "last-name":"Washington",
        "date-of-birth":"22/02/1732"
      },{
        "first-name":"Barack",
        "last-name":"Obama",
        "date-of-birth":"04/08/1961"
      }
    ]
  },
  {
    "title": "Beatles",
    "rows":[
      {
        "first-name":"John",
        "last-name":"Lennon",
        "date-of-birth":"09/10/1940"
      },{
        "first-name":"Paul",
        "last-name":"McCartney",
        "date-of-birth":"18/06/1942"
      },{
        "first-name":"George",
        "last-name":"Harrison",
        "date-of-birth":"25/02/1943"
      }
    ]
  }
]
```

The tabs can be useful for, say, having similar data across a range of years, or splitting the data for different areas to make it easier to parse. What you do with the data from then on is up to you!

On error, the module returns a string with the error message (e.g. "Could not retrieve worksheets").

## social-sharing.js
### Author: Chris Marsh (@chris_marsh)

This module will open up the social sharing links in a little popup window centered in the browser. You should pass the constructor function the element containing the social sharing links, as follows:

```html
<aside id="share">
  <a href="https://www.facebook.com/sharer/sharer.php?u=***URL***" class="facebook">Facebook</a>
  <a href="https://twitter.com/share?url=***URL***&amp;text=**TWEET_TEXT***&amp;via=**TWITTER_VIA***" class="twitter">Twitter</a>
  <a href="https://plus.google.com/share?url=***URL***" class="googleplus">Google Plus</a>
  <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=***URL***&amp;title=***TITLE***&amp;summary=***SUMMARY***&amp;source=***SOURCE***" class="linkedin">LinkedIn</a>
  <a href="https://pinterest.com/pin/create/button/?url=***URL***&amp;media=***IMAGE***&amp;description=***DESCRIPTION***" class="pinterest">Pinterest</a>
</aside>
```

```js
define(['jquery', 'ep/social-sharing'], function($, SOCIALSHARING) {

  $(function() {

    SOCIALSHARING($('#share'));

  });

});
```

## google-street-view.js

## key-input.js

## randomise-array.js

## scroll.js

## stopwatch.js
