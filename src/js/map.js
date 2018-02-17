$(function () {
    var map;
function initMap() {
    var myLoc = {lat: 38.6450919, lng: -121.161911}; 
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLoc,
      zoom: 14
    });
    
    var marker = new google.maps.Marker({
        'position': myLoc,
        'map': map,
        'title': 'Intel Corporation'
    });
    
    var contentString = 'Intel Corporation<br>';
        contentString += '1900 Prarie City Rd<br>';
        contentString += 'Folsom, CA 95630';
        contentString += '<br><a href="https://www.google.com/maps?ll=38.646941,-121.158585&z=16&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=13339657335930848820">View on Google Maps</a>'
    
    var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
    
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
  }

});