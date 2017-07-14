// -*- Mode: JavaScript; tab-width: 2; indent-tabs-mode: nil; -*-
// vim:set ft=javascript ts=2 sw=2 sts=2 cindent:
var Configuration = (function(window, undefined) {
    var abbrevsOn = true;
    var textBackgrounds = "striped";
    var svgWidth = '100%';
    var rapidModeOn = false;
    var confirmModeOn = true;
    var autorefreshOn = false;
    var typeCollapseLimit = 30;

    var visual = {
      margin: { x: 15, y: 8 },
      arcTextMargin: 1,
      boxSpacing: 10,
      curlyHeight: 20,
      arcSpacing: 20, //10;
      arcStartHeight: 10, //23; //25;
    }

    return {
      abbrevsOn: abbrevsOn,
      textBackgrounds: textBackgrounds,
      visual: visual,
      svgWidth: svgWidth,
      rapidModeOn: rapidModeOn,
      confirmModeOn: confirmModeOn,
      autorefreshOn: autorefreshOn,
      typeCollapseLimit: typeCollapseLimit,
    };
})(window);
