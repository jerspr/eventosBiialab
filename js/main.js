$(document).ready(function(){
	var swiper = new Swiper('.swiper-container',{
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });

    $('.responsive-calendar').responsiveCalendar({
    	events: {
            "2015-07-16": {
            	"number": 5,
            	"badgeClass": "badge-evento",
            	"url": "calendario.html"
            },
            "2015-07-10": {"number": 1, "badgeClass": "badge-evento", "url": "calendario.html"}
        }
    });
    $('.fileinput').fileinput();
});