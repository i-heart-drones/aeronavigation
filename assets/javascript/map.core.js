var markers = [];
var infowindows = [];
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 59.43914046, lng: 24.75219727 },
		zoom: 10,
		mapTypeControl: false,
		streetViewControl: false,
		styles: mapstyle
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map.setCenter(pos);
			map.setZoom(10);
			var marker = new google.maps.Marker({
				position: pos,
				map: map
			});
		}, function() {
			handleLocationError(true, '', map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, '', map.getCenter());
	}

	var tln_nfz = [
		{lng:24.79401536473493, lat:59.43168324295895},
		{lng:24.79401536473493, lat:59.43168324295895},
		{lng:24.79401453748891, lat:59.43168358254341},
		{lng:24.83856601086147, lat:59.42799392883642},
		{lng:24.87629428427681, lat:59.4310346144544},
		{lng:24.87591390997747, lat:59.39151458947369},
		{lng:24.83831895871049, lat:59.39467209032571},
		{lng:24.79359766316311, lat:59.39108277819063},
		{lng:24.79399199709568, lat:59.43168326564908}
	];

	var tln0a = [
		{lng:25.19277416311882, lat:59.50333245156182},
		{lng:25.18610861784037, lat:59.32166692139979},
		{lng:24.97611769642292, lat:59.28833618123142},
		{lng:24.65946017713809, lat:59.29999941284289},
		{lng:24.54195000942914, lat:59.31889022822394},
		{lng:24.51222437104619, lat:59.36499658122647},
		{lng:24.51216405867448, lat:59.36831258695737},
		{lng:24.50972448196801, lat:59.50055026608622},
		{lng:24.56417039479547, lat:59.54083510023666},
		{lng:24.96778459797978, lat:59.52833035783865},
		{lng:25.19277416311882, lat:59.50333245156182}
	];

	var tln0b = [
		{lng:24.83856601086147, lat:59.42799392883642},
		{lng:24.5797031987498, lat:59.4492591883455},
		{lng:24.57885300015995, lat:59.37370057014037},
		{lng:24.83831895871049, lat:59.39467209032571},
		{lng:25.09402799988122, lat:59.37300127120012},
		{lng:25.09590028816351, lat:59.44809591867977}
	];

	var tln0c = [
		{lng:24.751395285129547, lat:59.44428560087679}
	];


	infowindows[0] = new google.maps.InfoWindow({
		content : '<b>Tallinn, zone 9</b><br>max height: 60meters/200feet<br>max distance: 250meters, always in direct sight',
		pixelOffset: new google.maps.Size(0,-10)
	});

	infowindows[1] = new google.maps.InfoWindow({
		content : '<b>Tallinn, Restricted</b><br>Restricted airspace<br>Requires permit from ECAA',
		pixelOffset: new google.maps.Size(0,-10)
	});

	infowindows[2] = new google.maps.InfoWindow({
		content : '<b>Tallinn, EER720</b><br>Restricted airspace<br>Requires permit from ECAA and Police<br>Restricted from: 2017-07-01 00:00<br>Restricted until: 2017-12-31 23:59',
		pixelOffset: new google.maps.Size(0,-10)
	});

	var tln_zone9 = new google.maps.Polygon({
		paths: [tln0a,tln0b],
		strokeColor: '#0000ff',
		strokeOpacity: 0.3,
		strokeWeight: 1,
		fillColor: '#0000ff',
		fillOpacity: 0.1,
		infoWindowIndex : 0
	});
	tln_zone9.setMap(map);



/**
	tln_zone9.addListener('mouseover', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	tln_zone9.addListener('mousedown', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	tln_zone9.addListener('mouseout', function(event) { infowindows[this.infoWindowIndex].close(map, this); });
**/


	var tln_red = new google.maps.Polygon({
		paths: [tln0b],
		strokeColor: '#ff0000',
		strokeOpacity: 0.3,
		strokeWeight: 1,
		fillColor: '#ff0000',
		fillOpacity: 0.1,
		infoWindowIndex : 1
	});
	tln_red.setMap(map);

	var eer720 = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.6,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.45,
      map: map,
      center: tln0c[0],
      radius: 300,
	  infoWindowIndex : 2
    });

	// Construct the polygon.
	var tln_nfz = new google.maps.Polygon({
		paths: [tln_nfz],
		strokeColor: '#FF0000',
		strokeOpacity: 0.6,
		strokeWeight: 1,
		fillColor: '#FF0000',
		fillOpacity: 0.45
	});
	tln_nfz.setMap(map);

	
	google.maps.event.addListener(tln_zone9, 'mouseover', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(tln_zone9, 'mousemove', function(event) { infowindows[this.infoWindowIndex].setPosition(event.latLng); });
	//google.maps.event.addListener(tln_zone9, 'mousedown', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(tln_zone9, 'mouseout', function(event) { infowindows[this.infoWindowIndex].close(map, this); });

	google.maps.event.addListener(tln_red, 'mouseover', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(tln_red, 'mousemove', function(event) { infowindows[this.infoWindowIndex].setPosition(event.latLng); });
	//google.maps.event.addListener(tln_red, 'mousedown', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(tln_red, 'mouseout', function(event) { infowindows[this.infoWindowIndex].close(map, this); });
	
	google.maps.event.addListener(eer720, 'mouseover', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(eer720, 'mousemove', function(event) { infowindows[this.infoWindowIndex].setPosition(event.latLng); });
	//google.maps.event.addListener(eer720, 'mousedown', function(event) { infowindows[this.infoWindowIndex].open(map, this); });
	google.maps.event.addListener(eer720, 'mouseout', function(event) { infowindows[this.infoWindowIndex].close(map, this); });

}

