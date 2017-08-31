/* ============================================================
 * Facebook
 * ============================================================ */
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/* ============================================================
 * Twitter share
 * ============================================================ */
!function(d,s,id) {
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)) {
        js=d.createElement(s);
        js.id=id;
        js.src="//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");

var Banners = (function($) {

    function banners () {

        var $element = $('.banner-wrapper');

        if (!$element[0])
        {
            return;
        }

        var elementTop = $element.offset().top,
            elementHeight = $element.height(),
            $text = $element.find('.banner-text'),
            speed = 200,
            textOffset = $text.offset().top - elementTop;

        $element.click(function() {
            var $this = $(this),
                $image = $this.find('.banner-image'),
                $text = $this.find('.banner-text');

            if ($text.hasClass('text-up'))
            {
                $text.animate({top: textOffset},speed).removeClass('text-up');
                $image.animate({opacity:1},speed).removeClass('img-up');
            }
            else
            {
                if (!$text.data('top'))
                {
                    // Get the height of the text element that needs to scroll into view
                    var height = $text.innerHeight() - (elementHeight - textOffset);
                    $text.data('top', textOffset - height);
                }
                $text.animate({top: $text.data('top')},speed).addClass('text-up');
                $image.animate({opacity:0.8},speed).addClass('img-up');
            }
        });
    }

    return banners;

})(jQuery);

$(function () {
    //new Banners();
});
