$(document).ready(function() {
  var event_id = $("div.atnd").attr("id");
  $.ajax({
   type: "GET",
   url: "http://api.atnd.org/events/users/",
   data: "event_id=" + event_id + "&format=jsonp",
   dataType: "jsonp",
   success: 
    function(jsonp) { 
      var $h4 = $('<h4 />').append($('<a />').text(jsonp.events[0]["title"]).attr('href', jsonp.events[0]["event_url"]));
      $('div.atnd').empty().append($h4);
      var $ul = $('<ul />');
      var $li = "";
      var $img = "";
      $.each(jsonp.events[0]["users"], function() {
          if (this["twitter_img"] == null) {
            $img = $('<img />').attr({ src: "http://atnd.org/images/icon/default_latent.png", id: "noimg"});
          } else {
            $img = $('<a />').html($('<img />').attr({ src: this["twitter_img"], title: this["twitter_id"], alt: this["twitter_id"]})).attr('href', "http://twitter.com/" + this["twitter_id"]);
          }
          $li = $('<li />').append($img).append(
            $('<a />').html(this["nickname"]).attr('href', "http://atnd.org/users/show/" + this["user_id"])
          );

          if (this["status"] == 1) {
            $li.addClass("attend");
          } else {
            $li.addClass("waiting");
          }
          $li.appendTo($ul);
        });
        $("div.atnd").append($ul);
    }
 });
});

