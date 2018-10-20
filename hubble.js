feed=false;
$(function(){
  console.log("hubble loaded and jquery ok.");
      $.get( 'gallery.rss', function(data) {
        console.log("feed loaded.");
        feed = data;
      });

});
function imageUrls(){
  if(feed){
    var urls=[];
    var items=$(feed).find('item');
    items.each(function(){
      var item=$(this);
      urls.push(item.find('enclosure').attr('url'));
    });

  }
  else{
    console.log("no feed.");
    return false;
  }
}
