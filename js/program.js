$(document).ready(function() {

    $('.speaker-detail-text-more a').click(function(e) {
        $(this).parents().filter('.speaker-detail-text').toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.pager-size-select-current', function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.pager-size-select').length == 0) {
            $('.pager-size-select').removeClass('open');
        }
    });

    $('body').on('change', '.pager-size-select-item label input', function() {
        var curSelect = $(this).parents().filter('.pager-size');
        var curText = '';
        curSelect.find('.pager-size-select-item label input:checked').each(function() {
            curText = $(this).parent().find('span').html();
        });
        curSelect.find('.pager-size-select-current span').html(curText);
        $('.pager-size-select').removeClass('open');
    });

    var isPageClick = false;

    $('.speakers-filter form').submit(function(e) {
        var curForm = $(this);
        $('.speakers-container').addClass('loading');

        var curData = curForm.serialize();
        if ($('.speakers-container .pager a.active').length == 1) {
            curData += '&page=' + $('.pager a.active').attr('data-value');
        }
        if ($('.pager-size-select-item input:checked').length == 1) {
            curData += '&size=' + $('.pager-size-select-item input:checked').val();
        }
        $.ajax({
            type: 'POST',
            url: curForm.attr('action'),
            dataType: 'html',
            data: curData,
            cache: false
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('Сервис временно недоступен, попробуйте позже.');
            $('.speakers-container').removeClass('loading');
        }).done(function(html) {
            $('.speakers').html($(html).find('.speakers').html());
            $('.speakers-container .pager-container').html($(html).find('.pager-container').html());

            $('.speakers-container').removeClass('loading');
            if (isPageClick) {
                isPageClick = false;
                var curMargin = 140;
                $('html, body').animate({'scrollTop': $('.speakers-container').offset().top - curMargin});
            }
        });

        e.preventDefault();
    });

    $('body').on('change', '.speakers-filter-search input', function() {
        $('.speakers-filter form').trigger('submit');
    });

    $('body').on('change', '.speakers-filter-letters input', function() {
        $('.speakers-filter form').trigger('submit');
    });

    $('body').on('click', '.speakers-container .pager-container a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.speakers-container .pager-container a.active').removeClass('active');
            curLink.addClass('active');
            if (e.originalEvent === undefined) {
                isPageClick = false;
            } else {
                isPageClick = true;
            }
            $('.speakers-filter form').trigger('submit');
        }
        e.preventDefault();
    });

    $('body').on('change', '.speakers-container .pager-size-select-item label input', function() {
        isPageClick = true;
        $('.speakers-filter form').trigger('submit');
    });

    $('.event-detail-text-more a').click(function(e) {
        $(this).parents().filter('.event-detail-text').toggleClass('open');
        e.preventDefault();
    });

    $('.page-header-program-card-social-link').click(function(e) {
        $('.page-header-program-card-social').toggleClass('open');
        e.preventDefault();
    });

    function popupCenter(url, title) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
        var top = ((height / 3) - (360 / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }

    $('body').on('click', '.event-detail-social-tg', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://telegram.me/share/url?url=' + curUrl + '&text=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.event-detail-social-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&title=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.event-detail-social-ok', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://connect.ok.ru/offer?url=' + curUrl + '&title=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.event-detail-social-wa', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://api.whatsapp.com/send?text=' + curTitle + ': ' + curUrl, curTitle);

        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.page-header-program-card-social').length == 0) {
            $('.page-header-program-card-social').removeClass('open');
        }
    });

    $('.program-container').each(function() {
        if (typeof(programData) != 'undefined') {
            var htmlDays =  '<div class="program-days-inner">';
            for (var i = 0; i < programData.data.length; i++) {
                var curDay = programData.data[i];
                htmlDays +=     '<a href="#" class="program-days-item"><strong>' + curDay.day + '</strong><em></em><span>' + curDay.date + '</span></a>';
            }
            htmlDays +=     '</div>';

            $('.program-days').html(htmlDays);
            $('.program-days-item').eq(0).addClass('active');
            updateProgram();
        }
    });

    $('body').on('click', '.program-days-item', function(e) {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.program-days-item.active').removeClass('active');
            curItem.addClass('active');
            updateProgram();
        }
        e.preventDefault();
    });

});

$(window).on('load', function() {

    $('.speaker-detail-text').each(function() {
        var curText = $(this);
        curText.removeClass('open with-more');
        if (curText.find('.speaker-detail-text-container').height() < curText.find('.speaker-detail-text-inner').height()) {
            curText.addClass('with-more');
        }
    });

    $('.event-detail-text').each(function() {
        var curText = $(this);
        curText.removeClass('open with-more');
        if (curText.find('.event-detail-text-container').height() < curText.find('.event-detail-text-inner').height()) {
            curText.addClass('with-more');
        }
    });

});

$(window).on('load resize', function() {

    $('.program-content').each(function() {
        var contentWidth = $('.program-container').width();
        var windowWidth = $(window).width();
        var curOffset = (windowWidth - contentWidth) / 2;
        $('.program-content').css({'margin-left': -curOffset + 'px', 'margin-right': -curOffset + 'px'});
    });

});

function updateProgram() {
    var curDate = $('.program-days-item').index($('.program-days-item.active'));
    var curEvents =  programData.data[curDate].events;

    var minHour = 23;
    var maxHour = 0;

    if (curEvents != null) {
        for (var i = 0; i < curEvents.length; i++) {
            var curHour = Number(curEvents[i].start.split(':')[0]);
            if (curHour < minHour) {
                minHour = curHour;
            }
            curHour = Number(curEvents[i].end.split(':')[0]);
            if (curEvents[i].end.split(':')[1] != '00') {
                curHour++;
            }
            if (curHour > maxHour) {
                maxHour = curHour;
            }
        }

        var hoursHTML =     '<div class="program-hours">';
        for (var i = minHour; i <= maxHour; i++) {
            hoursHTML +=        '<div class="program-hour"><span>' + String('0' + i).slice(-2) + ':00</span><strong>' + String('0' + i).slice(-2) + ':00</strong></div>';
            if (i < maxHour) {
                hoursHTML +=    '<div class="program-hour-quarter"></div>' +
                                '<div class="program-hour-half"><span>' + String('0' + i).slice(-2) + ':30</span><strong>' + String('0' + i).slice(-2) + ':30</strong></div>' +
                                '<div class="program-hour-three-quarters"></div>';
            }
        }
        hoursHTML +=        '</div>';

        $('.program-content-table').html(hoursHTML);

        var curHalls = [];
        for (var i = 0; i < curEvents.length; i++) {
            if (curHalls.indexOf(curEvents[i].hall) == -1) {
                curHalls.push(curEvents[i].hall);
            }
        }

        var newHalls = [];
        for (var i = 0; i < programData.halls.length; i++) {
            if (curHalls.indexOf(programData.halls[i].id) != -1) {
                newHalls.push(programData.halls[i]);
            }
        }

        $('.program-content-halls').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });

        var hallsHTML = '';
        for (var i = 0; i < newHalls.length; i++) {
            var curHall = newHalls[i];
            hallsHTML +=    '<div class="program-hall">' +
                                '<div class="program-hall-inner" style="background:' + curHall.bg + '">' +
                                    '<div class="program-hall-title" style="color:' + curHall.color + '">' + curHall.title + '</div>' +
                                    '<div class="program-hall-place"><span style="color:' + curHall.color + '; background:' + curHall.bg + '"><svg style="fill:' + curHall.color + '"><use xlink:href="' + $('.program-content').attr('data-placeicon') + '"></use></svg>' + curHall.title + '</span></div>' +
                                '</div>' +
                            '</div>';
        }
        $('.program-content-halls').html(hallsHTML);

        $('.program-events').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });

        var eventsHTML =    '<div class="program-events">';

        var heightHour = 112;

        for (var i = 0; i < newHalls.length; i++) {
            var curHall = newHalls[i];
            eventsHTML +=          '<div class="program-events-hall">';
            for (var j = 0; j < curEvents.length; j++) {
                var curEvent = curEvents[j];
                if (curEvent.hall == curHall.id) {
                    var startHour = Number(curEvent.start.split(':')[0]);
                    var startMinutes = Number(curEvent.start.split(':')[1]);

                    var endHour = Number(curEvent.end.split(':')[0]);
                    var endMinutes = Number(curEvent.end.split(':')[1]);

                    var curTop = (startHour - minHour) * heightHour + startMinutes / 60 * heightHour;

                    var curHeight = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * heightHour - 3;

                    var border = 'border-top-color:' + curHall.color;
                    var curColor = 'color:' + curHall.color;

                    var openTag = 'div';
                    var closeTag = 'div';
                    if (typeof(curEvent.detail) != 'undefined') {
                        openTag = 'a href="' + curEvent.detail + '"';
                        closeTag = 'a';
                    }

                    eventsHTML +=   '<' + openTag + ' class="program-item" style="top:' + curTop +'px; min-height:' + curHeight + 'px; max-height:' + curHeight + 'px; ' + border + '">';
                    if (typeof(curEvent.notime) != 'undefined' && curEvent.notime) {
                        eventsHTML +=   '<div class="program-item-big" style="' + curColor + '">' + curEvent.title + '</div>';
                    } else {
                        eventsHTML +=   '<div class="program-item-top">' +
                                            '<div class="program-item-time"><svg><use xlink:href="' + $('.program-content').attr('data-timeicon') + '"></use></svg>' + curEvent.start + '&ndash;' + curEvent.end + '</div>';
                        if (typeof(curEvent.pause) != 'undefined') {
                            eventsHTML +=   '<div class="program-item-pause">' + curEvent.pause + '</div>';
                        }
                        eventsHTML +=       '<div class="program-item-title">' + curEvent.title + '</div>' +
                                        '</div>';
                    }
                    if (typeof(curEvent.logo) != 'undefined' || typeof(curEvent.type) != 'undefined') {
                        eventsHTML +=   '<div class="program-item-bottom">';
                        if (typeof(curEvent.type) != 'undefined') {
                            eventsHTML +=   '<div class="program-item-type"><span>' + curEvent.type + '</span></div>';
                        }
                        if (typeof(curEvent.logo) != 'undefined') {
                            eventsHTML +=   '<div class="program-item-logo"><img src="' + curEvent.logo + '" alt=""></div>';
                        }
                        eventsHTML +=   '</div>';
                    }
                    eventsHTML +=   '</' + closeTag + '>';
                }
            }
            eventsHTML +=       '</div>';
        }

        eventsHTML +=       '</div>';
        $('.program-content-table').append(eventsHTML);

        if ($(window).width() < 1024) {
            $('.program-content-halls').slick({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                prevArrow: '<div class="slick-prev"><svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.502 13.7403L6.26172 9.50002L10.502 5.2597L11.2923 6.05002L7.84234 9.50002L11.2923 12.95L10.502 13.7403Z" /></svg></div>',
                nextArrow: '<div class="slick-next"><svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49797 5.25967L11.7383 9.49998L7.49797 13.7403L6.70766 12.95L10.1577 9.49998L6.70766 6.04998L7.49797 5.25967Z" /></svg></div>',
                dots: false,
                adaptiveHeight: false,
                asNavFor: '.program-events',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }

        if ($(window).width() < 1024) {
            $('.program-events-hall').css({'height': $('.program-events').height()});
            $('.program-events').slick({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                dots: false,
                adaptiveHeight: false,
                asNavFor: '.program-content-halls',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    } else {
        $('.program-content-halls').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
        $('.program-content-halls').html('');

        $('.program-events').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
        $('.program-content-table').html('');
    }
}