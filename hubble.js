feed=false;
$(function(){
  console.log("hubble loaded and jquery ok.");
      $.get( 'gallery.rss', function(data) {
        console.log("feed loaded.");
        feed = data;
      });

});
function nextImage(){
  if(feed){
    test=feed;
  }
  else{
    console.log("no feed.");
    return false;
  }
}
