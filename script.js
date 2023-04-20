const ctx = document.getElementById('LineChart');
      
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['P-1', 'P-2','P-3','P-4','P-5','P-6'],
            datasets: [{
              label: '# of Active Hours',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'white'
              ],
              borderColor: [
                '	white'
              ],
              borderWidth: 1
            }]
          },

          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });







        ///-----MAP

		var mymap = L.map('mapid').setView([0, 0], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
			maxZoom: 18,
		}).addTo(mymap);
	
		var marker = L.marker([0, 0], { draggable: true }).addTo(mymap);
	
		var geofence = L.circle([0, 0], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.1,
			radius: 500
		}).addTo(mymap);
	
		function onLocationFound(e) {
			mymap.setView(e.latlng, 13);
			marker.setLatLng(e.latlng);
			geofence.setLatLng(e.latlng);
		}
	
		function onMarkerDrag(e) {
			var distance = mymap.distance(e.target.getLatLng(), geofence.getLatLng());
			if (distance > geofence.getRadius()) {
				document.getElementById('warning-box').innerHTML = 'Inactive';
				document.getElementById('warning-box').style.display = 'block';
			} else {
				document.getElementById('warning-box').innerHTML = 'Active';
				document.getElementById('warning-box').style.display = 'block';
			}
		}
	
		mymap.on('locationfound', onLocationFound);
		marker.on('drag', onMarkerDrag);
	
		mymap.locate({ setView: true, maxZoom: 16 });