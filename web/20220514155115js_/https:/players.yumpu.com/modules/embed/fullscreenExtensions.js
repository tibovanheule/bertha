var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var doc = window.document;
var docEl = doc.documentElement;
var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
var fsHoldOn = false;
var fsContainer;
var fsTime;
var fullscreenActivated = false;
var fsExt_magID = "";
var fsExt_idx = "";

function goFullscreen( magID, hIdx ) {
	try {
		if ( typeof(hIdx) == "undefined") {
			hIdx = 0;
		}
		fsExt_idx = "_" + hIdx;

		if ( typeof(magID) == "undefined" && typeof(window['magID']) != "undefined" ) {
			magID = window['magID'];
		}
		fsExt_magID = magID.toString();
		doc = window.document;
		if( !doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			fsHoldOn = true;
			requestFullScreen.call(docEl);
			$(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", onExitFullscreen );
			var htmlString = "<iframe id='iFramefsContainer' src='' frameborder='0' allowfullscreen='true' allowtransparency='true' style='position:absolute; left:0; top:0; width:100%; height:100%; position:fixed;'></div>";
            if($("#coverIframeBody").length){
                $("#coverIframeBody").css({
                    'left' : '0',
                    'top' : '0'
                });
            }
			fsContainer = $( htmlString )[0];
			document.body.appendChild( fsContainer );
			for ( var i=0; i<toHide.length; i++){
				$('#'+toHide[i]).hide();
			}
			pcLoadMagJSON();
			fsTime = new Date().getTime();
			fullscreenActivated = true;
		}
	} catch ( err ) {
		try { $('#fsOverlay'+fsExt_idx).empty().remove(); } catch ( err ) {}
	}
}

function onExitFullscreen(e) {
	e.stopImmediatePropagation();
	var dt = new Date().getTime() - fsTime;
	if ( dt > 300 ) {
		var sizeCheckOnQuickFSExit = false;
		try {
			if (dt < 3000) {
				if (typeof(window.screen) != "undefined") {
					sizeCheckOnQuickFSExit = ( $('#iFramefsContainer').width() < 0.8 * window.screen.availWidth || $('#iFramefsContainer').height() < 0.8 * window.screen.availHeight ) ? true : false;
				}
			}
		} catch (err) {	}
		if ((fullscreenActivated && dt > 3000) || sizeCheckOnQuickFSExit) {
            if($("#coverIframeBody").length) {
                $("#coverIframeBody").css({
                    'left': '',
                    'top': ''
                });
            }
			fullscreenActivated = false;
			destroyFSIFrame();
			$(document).off("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange");
			for (var i = 0; i < toHide.length; i++) {
				$('#' + toHide[i]).show();
			}
		}
	}
}

function destroyFSIFrame() {
	try { $('#iFramefsContainer').remove(); } catch ( err ) { console.log("FSEXT[2] err destroy "+ err); }
	fsContainer = null;
}

function pcLoadMagJSON() {
	try {
		var hURL = ( window.location.href.indexOf("dev.yumpu.com") >= 0 ) ? "//web.archive.org/web/20220513204731/https://dev.yumpu.com/en/document/json/" + fsExt_magID.toString() : "//web.archive.org/web/20220513204731/https://www.yumpu.com/en/document/json/" + fsExt_magID.toString();
		if ( window.location.href.indexOf("local.yumpu.com") >= 0 ) {
			hURL = hURL.replace(/dev.yumpu.com/, "local.yumpu.com");
			hURL = hURL.replace(/www.yumpu.com/, "local.yumpu.com");
		}
		hURL += "?callback=yfsecb";
		window['yfsecb'] = function(data) {};
		jQuery.support.cors = true;
		$.ajax({
			type: "GET",
			url: hURL,
			crossDomain: true,
			async: true,
			dataType: "jsonp",
			success: function(data) {
				if ( fullscreenActivated ) {
					var url = data['document'].embed_code;
					if ( url.length > 0 && url.toLowerCase().indexOf("<iframe") >= 0 ) {
						url = url.substring( url.indexOf('src=') + 5, url.indexOf('"', url.indexOf('src=') + 7 ) );
						url = url.replace("https:","");
						url = url.replace("http:","");
						if ( typeof(window['fsSP']) != "undefined" ) {
							url += window['fsSP'];
						}
						$('#iFramefsContainer').prop('src', url + "?isfsol=true" );
					} else {
						cancelFullScreen.call(window.document);
					}
				}
			},
			error: function(e) {  }
		});
	} catch ( err ) { }
}




}
/*
     FILE ARCHIVED ON 20:47:31 May 13, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:23:18 May 15, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 923.773
  exclusion.robots: 0.107
  exclusion.robots.policy: 0.098
  RedisCDXSource: 7.548
  esindex: 0.008
  LoadShardBlock: 134.766 (4)
  PetaboxLoader3.datanode: 132.091 (5)
  CDXLines.iter: 136.179 (4)
  load_resource: 893.657
  PetaboxLoader3.resolve: 863.443
*/