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

;var Tracking;
Tracking = (function () {

    var debug_console = 'off';
    var intercom_app_id = '9e7fb24c6e48df26c894b9d2959ebf88dfbc83cd';   // LIVE
    var analytics_tracking_id = '';
    var current_host = (typeof document.location.host !== "undefined" ? document.location.host:'');
    var tracking_environment = 'live';
	if(current_host.indexOf("yumpu.com") > 0) {
		var Intercom_enabled = true;
	} else{
		var Intercom_enabled = false;
	}

	if(window.disableintercom === true){
	    var Intercom_enabled = false;
    }

     switch(current_host) {
        case 'local.yumpu.com':
        case 'dev.yumpu.com':
            debug_console = 'on';
            intercom_app_id = 'f1hy57h7';
            analytics_tracking_id = 'UA-59582458-3';
            tracking_environment = 'dev';
            break;

        case 'www.yumpu.com':
            analytics_tracking_id = 'UA-27868640-1'; // LIVE www.yumpu.com
            break;

        default:
            analytics_tracking_id = 'UA-27868640-1';
     }

    Tracking.prototype.init = function () {


            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = 'https://web.archive.org/web/20220513073225/https://www.googletagmanager.com/gtag/js?id='+analytics_tracking_id;

            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);



        window.dataLayer = window.dataLayer || [];
        window['gtag'] = function gtag() {dataLayer.push(arguments);}
        window['gtag']('js', new Date());

        window['gtag']('config', analytics_tracking_id);

        window['gtag']('set', 'anonymizeIp', true);
		if(window.userid > 0) {
            window['gtag']('set', 'userId', window.userid);
		}

        if(!!window.webkioskTracker) {
            window['gtag']('event', 'uKiosk', { 'send_to': window.webkioskTracker });
            window['gtag']('uKiosk.set', 'anonymizeIp', true);
        }

        // intercom init
		if(Intercom_enabled) {
			window.intercomSettings = {app_id: intercom_app_id};
			(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://web.archive.org/web/20220513073225/https://widget.intercom.io/widget/f1hy57h7';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();

			if (debug_console == 'on') {
	            console.log('Intercom enabled');
	        }
		}
		else {
			if (debug_console == 'on') {
				console.log('Intercom disabled');
			}
		}
		/////////

        if (debug_console == 'on') {
			console.log('tracking debugger ' + debug_console);
            console.log('tracking initialized with anonymizeIp');
			if(window.userid > 0) {
				console.log('tracking initialized with userId');
			}
			console.log('Intercom enabled');

        }
        return true;
    };

    Tracking.prototype.yptrack = function(tool,hitType,eventCategory,eventAction,eventLabel,eventValue,fieldsObject) {
        if(tool == 'intercom' || tool == 'all') {
			if(Intercom_enabled) {
	            if (debug_console == 'on') {
	                console.log('intercom sent: ' + eventAction);
	            }
	            try {
	                Intercom('trackEvent', eventAction);
	            } catch (err) {
	                if (debug_console == 'on') {
	                    console.error('intercom error ' + err);
	                }
	            }
			}
			else {
				if (debug_console == 'on') {
					console.log('Intercom disabled');
				}
			}
        }
        if(tool == 'gtag' || tool == 'all') {

            if(hitType == 'pageview') {
                if(typeof eventCategory !== 'undefined') {
                    var gtag_send_prepare = {
                          'page': eventCategory
                    };
                }
            }
            else {
                var gtag_send_prepare = {
                    'eventAction': eventAction,
                    'eventCategory': eventCategory,
                    'eventLabel': eventLabel,
                    'eventValue': (typeof eventValue === 'undefined' ? 0:eventValue),
                    'nonInteraction': false
                }
            }

            if (debug_console == 'on') {
                console.log('gtag sent: ' + hitType, (typeof gtag_send_prepare === 'undefined' ? '':gtag_send_prepare));
            }
            try {
                gtag('event', hitType, (typeof gtag_send_prepare === 'undefined' ? '':gtag_send_prepare));

                if(!!window.webkioskTracker) {
                    gtag('event', hitType, (typeof gtag_send_prepare === 'undefined' ? '' : gtag_send_prepare));
                }
            } catch (err) {
                if (debug_console == 'on') {
                    console.error('gtag not defined ' + err);
                }
            }
        }
        return true;
    };

    Tracking.prototype.ypeventtrack = function(tool,category,additionalData) {
        if(tool == 'intercom' || tool == 'all') {
			if(Intercom_enabled) {
	            try {
	                if(typeof additionalData === 'undefined') {
	                    if (debug_console == 'on') {
	                        console.log('intercom sent ' + category);
	                    }
	                    Intercom('trackEvent', category);
	                }
	                else {
	                    if (debug_console == 'on') {
	                        console.log('intercom sent ' + category + 'additional: ' + additionalData);
	                    }
	                    Intercom('trackEvent', category, additionalData);
	                }
	            } catch (err) {
	                if (debug_console == 'on') {
	                    console.error('intercom error ' + err);
	                }
	            }
			}
			else {
				if (debug_console == 'on') {
					console.log('Intercom disabled');
				}
			}
        }
        if(tool == 'gtag' || tool == 'all') {
            try {
                if(typeof additionalData === 'undefined') {
                    gtag('send', 'event', 'All', category);

                    if(!!window.webkioskTracker) {
                        gtag('event', 'event', 'All', category);
                    }

                    if (debug_console == 'on') {
                        console.log('gtag event sent ' + category);
                    }
                }
                else{
                    gtag('send', 'event', 'All', category, additionalData);

                    if(!!window.webkioskTracker) {
                        gtag('uKiosk.send', 'event', 'All', category, additionalData);
                    }

                    if (debug_console == 'on') {
                        console.log('gtag event sent ' + category + ' additionalData: ' + additionalData);
                    }
                }
            } catch (err) {
                if (debug_console == 'on') {
                    console.error('gtag error ' + err);
                }
            }
        }

        return true;
    };

    Tracking.prototype.signup = function (user_id) {

        var showMessage = true;

        //Tracking:
	// Tracking.ypeventtrack('all', 'Registration_Completed');
        //Google Tag Manager
        if (window.location.href.indexOf( "dev.yumpu.com" ) == -1 && window.location.href.indexOf("local.yumpu.com") == -1) {
            dataLayer.push({'event': 'Registration_Completed'});
        }

        if (showMessage == true) {
            var myMessage = "Your registration has been successful.";
            if (yumpu_site_language.toLowerCase() == "de") {
                myMessage = "Ihre Registrierung war erfolgreich.";
            }

            //Message
            Messenger().post({
                message: myMessage,
                type: 'success',
                showCloseButton: true
            });
        }

        return true;
    };

    Tracking.prototype.upload = function (user_id) {

        var showMessage = true;

		try {
        	Tracking.ypeventtrack('all', 'DocumentUpload');
		} catch (e) {}
        //Google Tag Manager
        if (window.location.href.indexOf( "dev.yumpu.com" ) == -1 && window.location.href.indexOf("local.yumpu.com") == -1) {
            dataLayer.push({'event': 'DocumentUpload'});
        }

        if (showMessage == true) {
            var myMessage = "Thank you for uploading your file.";
            if (yumpu_site_language.toLowerCase() == "de") {
                myMessage = "Vielen Dank für das Hochladen Ihrer Datei.";
            }

            Messenger().post({
                message: myMessage,
                type: 'success',
                showCloseButton: true
            });
        }

        return true;
    };


    Tracking.prototype.sale = function (value, curreny, user_id, plan_code, ecommerceAddTransaction, ecommerceItem) {

        var showMessage = true;

        // Tracking.ypeventtrack('all', 'Kaufbestaetigungen');

        //Google Tag Manager
        if (window.location.href.indexOf( "dev.yumpu.com" ) == -1 && window.location.href.indexOf("local.yumpu.com") == -1) {
            dataLayer.push({'event': 'Kaufbestaetigungen'});
        }

        // Google ecommerce
        if(typeof ecommerceAddTransaction !== 'undefined') {
            gtag('require', 'ecommerce');
            gtag('ecommerce:addTransaction',ecommerceAddTransaction);
            gtag('ecommerce:addItem', ecommerceItem);
            gtag('ecommerce:send');
        }

        return true;
    };
});

$(document).ready(function() {

    if (typeof Tracking === 'function') {
        Tracking = new Tracking();
        Tracking.init();
        Tracking.yptrack('gtag', 'pageview');
    }

    $(document).on('click', '.yp-event-track', function (e) {
        var additionalData = $(this).data('data-event-additional-data');
        var category = $(this).data('event-category');
        var label = $(this).data('event-label');
        var value = $(this).data('event-value');
    	var action = $(this).data('event-action');

    	var extra = $(this).data('extra-event-action');


        if(typeof category === 'undefined') {
            category = 'All';
        }
        if(typeof value === 'undefined'){
            value = 0;
        }

    	if(typeof additionalData === 'undefined') {
            Tracking.yptrack('all', 'event', category, action,label, value);
        }
        else {
            Tracking.ypeventtrack('all', category, additionalData);
        }

    	if(typeof extra !== 'undefined') {
    		Tracking.ypeventtrack('all', extra);
    	}

    });
});


}
/*
     FILE ARCHIVED ON 07:32:25 May 13, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:23:55 May 15, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 313.945
  exclusion.robots: 0.143
  exclusion.robots.policy: 0.134
  cdx.remote: 0.079
  esindex: 0.01
  LoadShardBlock: 242.103 (3)
  PetaboxLoader3.datanode: 303.818 (5)
  CDXLines.iter: 22.734 (3)
  load_resource: 154.062 (2)
  PetaboxLoader3.resolve: 43.62
*/