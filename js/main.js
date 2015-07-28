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

    //mapas
    gebo_maps.init();
});

location_add_form=$('.location_add_form');
location_table=$('.location_table');
g_Map=$('#g_map');
function clear_search(){
  $('#gmap_search input').val('');
};
function clear_form(){
  location_add_form.hide().find('input').val('');
};
function marker_callback(marker){
  $('#comp_lat_lng').val(marker.position.lat().toFixed(6)+', '+marker.position.lng().toFixed(6));
  g_Map.gmap3({
    action:'getAddress',
    latLng:marker.getPosition(),
    callback:function(results){
      $('#comp_address').val(results[0].formatted_address);
    }
  });
};
gebo_maps={
  init:function(){
    gebo_maps.create();
    gebo_maps.show_location();
  },
  create:function(){
    g_Map.gmap3({
      action:'init',
      options:{center:[-12.046374, -77.042793],zoom:5},
      callback:function(){
        $('#search-map').on('click',function(){
          gebo_maps.drop_marker_search();
          return false;
        });
        $(".custom-search-input").keypress(function(event){
            if(event.which==13){
                event.preventDefault();
                gebo_maps.drop_marker_search();
            }
        });
      }
    });
  },
  show_location:function(){
    location_table.on('click','.show_on_map',function(){
      clear_search();
      clear_form();
      var this_item=$(this).closest('tr');
      var show_lat_lng=$('#comp_lat_lng').val(this_item.find('td:nth-child(5)').text());
      var latLng_array=show_lat_lng.val().split(',');
      $('html,body').animate(
        {scrollTop:$('.main_content').offset().top- 40},
        'fast',
        function(){g_Map.gmap3(
          {action:'clear',name:'marker'},
          {action:'addMarker',latLng:latLng_array,map:{center:true,zoom:18}
        });
      });
    });
  },
  drop_marker_search:function(){
    var search_query=$('#gmap_search input').val();
    if(search_query!=''){
      g_Map.gmap3(
        {action:'clear',name:'marker'},
        {
          action:'addMarker',
          address:search_query,
          map:{center:true,zoom:15},
          marker:{
            options:{draggable:true},
            events:{
              dragend:function(marker){
                marker_callback(marker);
                g_Map.gmap3('get').panTo(marker.position);
              }
            },
            callback:function(marker){
              if(marker){
                location_add_form.slideDown('normal');
                marker_callback(marker);
              }else{
                clear_form();
              }
            }
          }
        }
      )
    }else{
      clear_form();
      $.sticky("Please Enter Location Name.",{autoclose:5000,position:"top-center"});
    }
  }
};