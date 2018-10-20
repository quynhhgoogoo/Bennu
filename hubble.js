hubbleImages=[];
$(function(){
  console.log("hubble loaded and jquery ok.");
      $.get( 'gallery.rss', function(feed) {
        console.log("feed loaded.");
        var items=$(feed).find('item');
        items.each(function(){
          var item=$(this);
          hubbleImages.push(item.find('enclosure').attr('url'));
        });

      });

});
