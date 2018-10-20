$(function(){
  console.log("hubble loaded and jquery ok.");

  Hubble={
    this.index = 0;
    init: function() {
      console.log('init() called.');
      $.get( 'gallery.rss', function(data) {
        this.feed = data;
      });
    },
    
    next: function() {
      console.log('next() called.');
    },
  }
  
});
