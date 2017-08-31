<?php
/**
 * Created by PhpStorm.
 * User: Faaraz
 * Date: 20-6-2016
 * Time: 20:43
 */

?>
<?php session_start(); ?>

<!DOCTYPE Html>
<head>
    <!-- indexer: on -->
    <title>Of Mice & Men - Manifesto</title>
    <!-- indexer: off -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="content-language" content="nl_NL">
    <meta name="viewport" id="iphone-viewport" content="minimum-scale=1.0, maximum-scale=1.0, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta property="og:title" content="Contact">
    <meta property="og:url" content="http://paradiso.nl/web/Contact.htm">
    <meta property="og:image" content="http://paradiso.nl/static/paradisopresentation/img/paradiso_og.jpg">
    <meta property="og:site_name" content="Paradiso">
    <meta property="og:type" content="website">
    <!-- indexer: on -->
    <meta name="keywords" content="Paradiso">
    <link rel="stylesheet" type="text/css" href="./CSS/css.css">
    <link rel="stylesheet" type="text/css" href="./CSS/jquery.ui.css">
    <link rel="stylesheet" type="text/css" href="./CSS/dynamit.jquery-ui.spinner-1.0.css">
    <link rel="stylesheet" type="text/css" href="./CSS/dynamit.jquery-ui.scroller-1.0.css">
    <link rel="stylesheet" type="text/css" href="./CSS/dynamit.jquery-ui.carousel-2.0.css">
    <link rel="stylesheet" type="text/css" href="./CSS/layout.css">
    <link rel="stylesheet" type="text/css" href="./CSS/print.css">
    <!--[if lte IE 8]>
    <link rel="stylesheet" type="text/css" media="screen, projection" href="/static/paradisopresentation/css/ie.css" />
    <![endif]-->
    <link href="/static/paradisopresentation/css/print.css" media="print" rel="stylesheet" type="text/css">
    <div style="display: none;" id="fit-vids-style" class="fit-vids-style">­<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style></div><script src="http://bam.nr-data.net/1/74dd0a7c08?a=4990578&amp;v=852.a36f0fd&amp;to=bldbMhFQDUBWU00NDVcdczUzHjR2dR1wKiQWQksJCVQARxheVTsGQFxYCwpFPENWQlgAC0pdSRQGQgZdQ1FNDQ1XHUkHBFRMUFheTQEMTRxTFRM%3D&amp;ap=229&amp;be=133&amp;fe=704&amp;dc=130&amp;f=%5B%5D&amp;perf=%7B%22timing%22:%7B%22of%22:1456911596280,%22n%22:0,%22u%22:2,%22ue%22:3,%22dl%22:2,%22di%22:155,%22ds%22:201,%22de%22:262,%22dc%22:836,%22l%22:836,%22le%22:845,%22f%22:1,%22dn%22:1,%22dne%22:1,%22c%22:1,%22ce%22:1,%22rq%22:1,%22rp%22:2,%22rpe%22:39%7D,%22navigation%22:%7B%22ty%22:2%7D%7D&amp;jsonp=NREUM.setToken" type="text/javascript"></script><script src="http://js-agent.newrelic.com/nr-852.min.js"></script><script src="http://www.google-analytics.com/analytics.js" async="" type="text/javascript"></script><script src="//www.googletagmanager.com/gtm.js?id=GTM-THVHMZ" async=""></script><script src="http://stats.g.doubleclick.net/dc.js" async="" type="text/javascript"></script><script src="//platform.twitter.com/widgets.js" id="twitter-wjs"></script><script src="//connect.facebook.net/nl_NL/all.js#xfbml=1" id="facebook-jssdk"></script><script type="text/javascript" src="/static/paradisopresentation/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.10.3/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.10.3/ui/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.10.3/external/jquery.mousewheel.js" defer="defer"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.10.3/klass.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/dynamit.jquery.utils.custom.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/dynamit.jquery-ui.carousel-2.0.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/ResponsiveViewControllerAbstract.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/dynamit.jquery-viewstateobservable-1.0.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/ParadisoColumnHeightSyncController.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/paradiso.jquery-ui.carousel-vertical-1.0.min.js" defer="defer"></script>
    <script type="text/javascript" src="/static/paradisopresentation/js/jquery.fitvids.js" defer="defer"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.artist-image').paradisoResponsiveCarouselVertical();
            var columnHeightSyncController = new ParadisoColumnHeightSyncController();
            $(".video").fitVids();
            columnHeightSyncController.init();
            $('#nav').click(function(){
                if($(this).find('ul.small li.sfhover').length == 0){
                    $(this).find('ul.small li').addClass('sfhover');
                }else{
                    $(this).find('ul.small li').removeClass('sfhover');
                }
            }).find('input').click(function(e){
                e.stopPropagation();
            });
            $('#toggleLink').click(function() {
                $('.toggledDiv').slideToggle('slow');
            });
            $('#sponsors a').each(function(){
                var $anchor = $(this);
                $(this).find('img').imageLoad(function(){
                    var $img = $(this);
                    var height = $(this).height();
                    $anchor.hover(
                        function(e){
                            $img.css('margin-top', -(height/2) + 'px');
                        },
                        function(e){
                            $img.css('margin-top', 0);
                        }
                    ).width('auto');
                });
            });
        });
    </script>
    <script type="text/javascript" src="/static/paradisopresentation/js/paradiso.js"></script>
    <link rel="canonical" href="http://paradiso.nl/web/Contact.htm">
    <script type="text/javascript" src="/wm/f/lib.js"></script>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-10212496-1']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
    <script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(t,e,n){function r(n){if(!e[n]){var o=e[n]={exports:{}};t[n][0].call(o.exports,function(e){var o=t[n][1][e];return r(o||e)},o,o.exports)}return e[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({QJf3ax:[function(t,e){function n(){}function r(t){function e(t){return t&&t instanceof n?t:t?a(t,i,o):o()}function c(n,r,o){t&&t(n,r,o);for(var i=e(o),a=f(n),c=a.length,u=0;c>u;u++)a[u].apply(i,r);return i}function u(t,e){p[t]=f(t).concat(e)}function f(t){return p[t]||[]}function s(){return r(c)}var p={};return{on:u,emit:c,create:s,listeners:f,context:e,_events:p}}function o(){return new n}var i="nr@context",a=t("gos");e.exports=r()},{gos:"7eSDFh"}],ee:[function(t,e){e.exports=t("QJf3ax")},{}],3:[function(t,e){function n(t){return function(){r(t,[(new Date).getTime()].concat(i(arguments)))}}var r=t("handle"),o=t(1),i=t(2);"undefined"==typeof window.newrelic&&(newrelic=window.NREUM);var a=["setPageViewName","addPageAction","setCustomAttribute","finished","addToTrace","inlineHit","noticeError"];o(a,function(t,e){window.NREUM[e]=n("api-"+e)}),e.exports=window.NREUM},{1:12,2:13,handle:"D5DuLP"}],gos:[function(t,e){e.exports=t("7eSDFh")},{}],"7eSDFh":[function(t,e){function n(t,e,n){if(r.call(t,e))return t[e];var o=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,e,{value:o,writable:!0,enumerable:!1}),o}catch(i){}return t[e]=o,o}var r=Object.prototype.hasOwnProperty;e.exports=n},{}],D5DuLP:[function(t,e){function n(t,e,n){return r.listeners(t).length?r.emit(t,e,n):void(r.q&&(r.q[t]||(r.q[t]=[]),r.q[t].push(e)))}var r=t("ee").create();e.exports=n,n.ee=r,r.q={}},{ee:"QJf3ax"}],handle:[function(t,e){e.exports=t("D5DuLP")},{}],XL7HBI:[function(t,e){function n(t){var e=typeof t;return!t||"object"!==e&&"function"!==e?-1:t===window?0:i(t,o,function(){return r++})}var r=1,o="nr@id",i=t("gos");e.exports=n},{gos:"7eSDFh"}],id:[function(t,e){e.exports=t("XL7HBI")},{}],G9z0Bl:[function(t,e){function n(){if(!v++){var t=l.info=NREUM.info,e=f.getElementsByTagName("script")[0];if(t&&t.licenseKey&&t.applicationID&&e){c(p,function(e,n){t[e]||(t[e]=n)});var n="https"===s.split(":")[0]||t.sslForHttp;l.proto=n?"https://":"http://",a("mark",["onload",i()]);var r=f.createElement("script");r.src=l.proto+t.agent,e.parentNode.insertBefore(r,e)}}}function r(){"complete"===f.readyState&&o()}function o(){a("mark",["domContent",i()])}function i(){return(new Date).getTime()}var a=t("handle"),c=t(1),u=window,f=u.document;t(2);var s=(""+location).split("?")[0],p={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-852.min.js"},d=window.XMLHttpRequest&&XMLHttpRequest.prototype&&XMLHttpRequest.prototype.addEventListener&&!/CriOS/.test(navigator.userAgent),l=e.exports={offset:i(),origin:s,features:{},xhrWrappable:d};f.addEventListener?(f.addEventListener("DOMContentLoaded",o,!1),u.addEventListener("load",n,!1)):(f.attachEvent("onreadystatechange",r),u.attachEvent("onload",n)),a("mark",["firstbyte",i()]);var v=0},{1:12,2:3,handle:"D5DuLP"}],loader:[function(t,e){e.exports=t("G9z0Bl")},{}],12:[function(t,e){function n(t,e){var n=[],o="",i=0;for(o in t)r.call(t,o)&&(n[i]=e(o,t[o]),i+=1);return n}var r=Object.prototype.hasOwnProperty;e.exports=n},{}],13:[function(t,e){function n(t,e,n){e||(e=0),"undefined"==typeof n&&(n=t?t.length:0);for(var r=-1,o=n-e||0,i=Array(0>o?0:o);++r<o;)i[r]=t[e+r];return i}e.exports=n},{}]},{},["G9z0Bl"]);</script><style type="text/css">.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:"lucida grande", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}
        .fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif)}.fb_dialog_close_icon:active{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif)}.fb_dialog_loader{background-color:#f6f7f8;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100%}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100%;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3a5795;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50%;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100%;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100%}.fb_dialog.fb_dialog_mobile.loading{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ya/r/3rhSv5V8j3o.gif) white no-repeat 50% 50%;min-height:100%;min-width:100%;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100%}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100%;min-height:100%;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0% 0%, 0% 100%, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100%}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0% 0%, 0% 100%, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #2f477a;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y9/r/jKEcVPZFk-2.gif) no-repeat 50% 50%;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f8;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yD/r/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50% 50%;height:24px;width:24px}@keyframes rotateSpinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100%}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100%}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y9/r/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50%;z-index:4}</style></head>
<body><div class="view-state-indicator" id="view-state-indicator-tablet" data-view-state="tablet"></div>
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-THVHMZ"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-THVHMZ');</script>
<!-- End Google Tag Manager -->
<div class=" fb_reset" id="fb-root"><div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div><iframe src="http://staticxx.facebook.com/connect/xd_arbiter.php?version=42#channel=f3267caa2a3ea24&amp;origin=http%3A%2F%2Fparadiso.nl" style="border: medium none;" tabindex="-1" title="Facebook Cross Domain Communication Frame" aria-hidden="true" id="fb_xdm_frame_http" scrolling="no" allowfullscreen="true" allowtransparency="true" name="fb_xdm_frame_http" frameborder="0"></iframe><iframe src="https://staticxx.facebook.com/connect/xd_arbiter.php?version=42#channel=f3267caa2a3ea24&amp;origin=http%3A%2F%2Fparadiso.nl" style="border: medium none;" tabindex="-1" title="Facebook Cross Domain Communication Frame" aria-hidden="true" id="fb_xdm_frame_https" scrolling="no" allowfullscreen="true" allowtransparency="true" name="fb_xdm_frame_https" frameborder="0"></iframe></div></div><div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div></div></div></div>
<div class="view-state-indicator" data-view-state="mobile" id="view-state-indicator-mobile"></div>
<div class="view-state-indicator" data-view-state="screen" id="view-state-indicator-screen"></div>
<div id="wrapper">
    <div id="headercontainer">
        <div id="header">
            <div class="toggledDiv">
                <div id="social">
                    <ul>
                        <li><a href="http://www.paradiso.nl/rss.xml" title="Abonneer je op onze RSS feed" target="_blank" class="rss"></a></li>
                        <li><a href="http://open.spotify.com/user/paradisoamsterdam/playlist/4bKJ5FMT9yYRqtUf2rxrK8" title="Deze week op Spotify" target="_blank" class="spotify"></a></li>
                        <li><a href="http://twitter.com/paradisoadam" title="Volg ons op Twitter" target="_blank" class="twitter"></a></li>
                        <li><a href="http://facebook.com/ParadisoAdam" title="Bezoek ons op Facebook" target="_blank" class="facebook"></a></li>
                        <li><a href="http://instagram.com/paradisoadam" title="Bekijk ons op Instagram" target="_blank" class="instagram"></a></li>
                    </ul>
                </div>
            </div>
            <div class="logo">
                <a href="/web/Agenda.htm" title="Paradiso"></a>
            </div>
            <div id="sitewide">
                <div class="language">
                    <a href="/web/English-Agenda.htm" title="" class="english">
                        <span>EN</span>
                        <div class="full">English</div>
                    </a>
                </div>
                <a href="#" id="toggleLink">Social</a>
            </div>
        </div>
        <div id="nav">
            <ul class="small">
                <li>
                    <a href="javascript:void(0);">Menu</a>
                    <ul>
                        <li class="first ">
                            <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemeneHomepage">Agenda</a>
                        </li>
                        <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=administratorHomepage">Kaartverkoop</a></li>
                        <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/contact.html">Contact</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="big">
                <li class="first ">
                    <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemeneHomepage">Agenda</a>
                </li>
                <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=administratorHomepage">Kaartverkoop</a></li>
                <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/contact.html">Contact</a></li>
            </ul>
            <div id="search">
                <form name="search79696" action="/web/show/search" method="get" id="search79696">
                    <input name="id" value="79906" type="hidden">
                    <input name="from" value="" type="hidden">
                    <input name="to" value="" type="hidden">
                    <input name="webid" value="26098" type="hidden">
                    <input name="searchid" value="79696" type="hidden">
                    <fieldset>
                        <div id="zoek">
                            <label>Zoeken</label>
                            <input name="keyword" value="" class="" id="" type="text">
                            <input class="button" value="Zoek" name="submit" type="submit">
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <div class="column left navigation">
            <div class="subnav">
                <ul>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemeneHomepage" class="nav" title="ManifestoAgenda">Agenda</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/Contact" class="nav" title="Contact">Contact</a></li>
                </ul>
            </div>
            <div style="float: left; clear: both; width: 0px; height: 529px;" class="height-sync-element"></div></div>
        <div class="column middle">
            <!-- indexer: on -->
            <h1 class="title">Of Mice & Men</h1>
            <div class="richText" id="elementscontainer">
                Of Mice & Men is een band uit het metal genre

                <img src="./img/OfMiceMen.jpg" alt="OfMice&Men" title="OfMice&Men" height="86" width="53">

                <?php
                if (isset($_SESSION['userrole'])) {
                    ?>
                    <form action='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/Kaartverkoop.php' method='post'>
                    <td><input type='submit' value='bestellen' name='bestellen'/></td>
                    </form>
                    <?php

                }  else{
                    ?>
                    U bent niet ingelogd en kunt daarom geen kaarten bestellen voor dit concert.
                    <?php
                }

                ?>

            </div>
            <!-- indexer: off -->

            <div style="float: left; clear: both; width: 0px; height: 43px;" class="height-sync-element"></div></div>
        <div class="column right">
            <div style="height: 224px;" class="artist-image carousel" id="carousel" data-auto-rotate="true" data-animation-type="fade" data-responsive="true" data-preserve-aspect-ratio="true" data-delay="4000" data-aspect-ratio="0.75">
                <ul style="height: 224px; width: 2950.2px;" class="slides-list stacked-slides">



                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 473px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="./img/paradisoinside.jpg" alt="London Calling passe-partout 11 en 12 maart" height="224" width="473"></li>
                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/6/e/1/11980_fat_freddy_web.jpg" alt="Fat Freddy's Drop - extra concert op dinsdag 5 april" height="224" width="335"></li>
                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/7/b/e/12119_MbongwanaStar300x200.jpg" alt="Mbongwana Star   -   locatie: Paradiso Noord, Tolhuistuin" height="224" width="335"></li>
                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/1/c/0/cid12293_fat_freddy_web.jpg" alt="Fat Freddy's Drop" height="224" width="335"></li>
                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/9/8/3/11897_Africadelic-Ricard-Bona-300.jpg" alt="Richard Bona &amp; Mandekan Cubano - Africadelic" height="224" width="335"></li>
                    <li style="width: 298px; height: 224px; z-index: 0;"><img style="width: 340px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/8/1/0/12114_jbn%20doornroosje%20fb%2015_300x200.jpg" alt="Jungle by Night Releaseshow" height="224" width="340"></li>
                    <li class="" style="width: 298px; height: 224px; z-index: 0; opacity: 1;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="/upload_mm/1/e/7/11833_Junior_Boys_presspic_Tom%20Weatherill%20300x200.jpg" alt="Junior Boys + special guest Jessy Lanza
							+ Borys - locatie: Paradiso Noord, Tolhuistuin" height="224" width="335"></li><li class="" style="width: 298px; height: 224px; z-index: 0; opacity: 1;"><img style="width: 335px; height: 224px; margin-left: 0px; margin-top: 0px;" class="slide-image" src="./img/paradisoinside.jpg" alt="An Evening with The Chris Robinson Brotherhood" height="224" width="335"></li></ul>
            </div>
            <div class="text">
                <div style="height: 376px;" class="descriptions-carousel">


                    <a class="uitgelicht" href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/OfMice&Men.php" alt="Of Mice & Men
						">
                        <span class="date">mrt vr 25</span>
                        Of Mice & men
                    </a>
                    <a class="uitgelicht" href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/AskingAlexandria.php" alt="Asking Alexandria">
                        <span class="date">mrt vr 25</span>
                        Asking Alexandria
                    </a>
                    <a class="uitgelicht" href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/BringmetheHorizon.php" alt="Bring me the Horizon">
                        <span class="date">mrt za 26</span>
                        Bring me the Horizon
                    </a>
                    <a class="uitgelicht" href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/CrowntheEmpire.php" alt="Crown the Empire">
                        <span class="date">mrt za 26</span>
                        Crown the Empire
                    </a>
                    <a class="uitgelicht" href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/Adept.php" alt="Adept">
                        <span class="date">mrt ma 28</span>
                        Adept
                    </a>
                    <a class="uitgelicht" href="" alt="Richard Bona &amp; Mandekan Cubano - Africadelic">
                        <span class="date">mei wo 25</span>
                        Soon™
                    </a>
                    <a class="uitgelicht" href="" alt="Jungle by Night Releaseshow">
                        <span class="date">mei vr 27</span>
                        Soon™
                    </a>
                    <a class="uitgelicht" href="" alt="Junior Boys + special guest Jessy Lanza
							+ Borys - locatie: Paradiso Noord, Tolhuistuin">
                        <span class="date">apr wo 02</span>
                        Soon™
                    </a><a class="uitgelicht" href="" alt="An Evening with The Chris Robinson Brotherhood">
                        <span class="date">apr do 03</span>
                        Soon™
                    </a></div>
            </div>
            <div style="float: left; clear: both; width: 0px; height: 0px;" class="height-sync-element"></div></div>
    </div><!-- /headercontainer -->
    <div id="footer">
        <div class="footercontent">
            <ul id="sponsors" class="sponsors">
                <li>
                    <a style="width: auto;" href="http://www.groteprijsvan.nl/" target="_blank">
                        <img src="./img/degroteprijsvannederland.gif" alt="De Grote Prijs van Nederland" title="De Grote Prijs van Nederland" height="86" width="95">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://paradiso.melkweg.nl/" target="_blank">
                        <img src="./img/pmp.gif" alt="Paradiso Melkweg Productiehuis" title="Paradiso Melkweg Productiehuis" height="86" width="48">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://5daysoff.nl/" target="_blank">
                        <img src="./img/5daysoff.gif" alt="5 Days Off" title="5 Days Off" height="86" width="46">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.clubpera.nl/" target="_blank">
                        <img src="./img/clubpera.gif" alt="Club Pera" title="Club Pera" height="86" width="70">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.marmoucha.nl/" target="_blank">
                        <img src="./img/marmoucha.gif" alt="Marmoucha" title="Marmoucha" height="86" width="71">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.rocketcinema.nl" target="_blank">
                        <img src="./img/rocketcinema.gif" alt="Rocket Cinema" title="Rocket Cinema" height="86" width="53">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://sonicacts.com/" target="_blank">
                        <img src="./img/sonicacts.gif" alt="Sonic Acts" title="Sonic Acts" height="86" width="83">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.tickettothetropics.nl/" target="_blank">
                        <img src="./img/tickettothetrophics.gif" alt="Ticket to the Tropics" title="Ticket to the Tropics" height="86" width="60">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.tolhuistuin.nl/" target="_blank">
                        <img src="./img/tolhuistuin.gif" alt="Tolhuistuin" title="Tolhuistuin" height="86" width="32">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.spin-off.nu/" target="_blank">
                        <img src="./img/spinoff.gif" alt="Spin Off" title="Spin Off" height="86" width="84">
                    </a>
                </li>
                <li>
                    <a style="width: auto;" href="http://www.likeminds.nl/" target="_blank">
                        <img src="./img/likeminds.gif" alt="Like Minds" title="Like Minds" height="86" width="83">
                    </a>
                </li>
            </ul><ul id="sponsors-right" class="sponsors">
                <li>
                    <a href="http://www.amsterdam.nl/" target="_blank">
                        <img src="./img/GemeenteAmsterdam.gif" alt="Gemeente Amsterdam" title="Gemeente Amsterdam" height="86" width="91">
                    </a>
                </li>
                <li>
                    <a href="http://www.heineken.com/" target="_blank">
                        <img src="./img/heineken.gif" alt="Heineken" title="Heineken" height="86" width="90">
                    </a>
                </li>
            </ul>
        </div>
    </div><!-- /footer -->
</div><!-- /wrapper -->
<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"applicationID":"4990578","applicationTime":229,"beacon":"bam.nr-data.net","queueTime":0,"licenseKey":"74dd0a7c08","transactionName":"bldbMhFQDUBWU00NDVcdczUzHjR2dR1wKiQWQksJCVQARxheVTsGQFxYCwpFPENWQlgAC0pdSRQGQgZdQ1FNDQ1XHUkHBFRMUFheTQEMTRxTFRM=","agent":"","errorBeacon":"bam.nr-data.net"}</script>

