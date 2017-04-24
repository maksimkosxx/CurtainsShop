function initMap() {
    var $link = $('').find('');

    $link.on("click", function (e) {
        var link = $(this).data('id'),
            marker = window.mapMarkers[link];

        e.preventDefault();

        if (marker) {
            google.maps.event.trigger(marker, "click");
        }

        $link.removeClass('contacts-info__item--active');
        $(this).addClass('contacts-info__item--active');
    });

    google.maps.event.addDomListener(window, 'load', googleMap);
}


function googleMap() {
    var $map = $('#map'),
        $point = $map.find('.point');


    if ($map.length) {
        window.points = [];
        window.mapMarkers = [];

        $point.each(function () {
            var coordinate = $(this).data('coordinate'),
                itemArr = [];

            $(this).find('p').each(function () {
                var item = $(this).text();
                itemArr.push('<p>' + item + '</p>');
            });

            window.points.push({
                coordinate: coordinate,
                urlPath: $(this).data('url'),
                name: $(this).data('name'),
                text: $(this).data('text'),
                time: $(this).data('time'),
                idItem: $(this).data('id'),
                arrCoordinate: coordinate.split(','),
                items: itemArr.join('')
            });
        });

        window.map = new GMaps({
            div: map,
            zoom: 15,
            lat: 51.658100,
            lng: 39.182185,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        });

        // var msc = [
        //     [55.571115,37.667999],
        //     [55.572789,37.617188],
        //     [55.585209,37.555389],
        //     [55.608487,37.493591],
        //     [55.650352,37.444153],
        //     [55.691399,37.412567],
        //     [55.737042,37.375488],
        //     [55.782631,37.371368],
        //     [55.825081,37.393341],
        //     [55.867486,37.409821],
        //     [55.885975,37.464752],
        //     [55.905225,37.53067],
        //     [55.909844,37.596588],
        //     [55.896756,37.654266],
        //     [55.885205,37.724304],
        //     [55.821224,37.834167],
        //     [55.792669,37.841034],
        //     [55.757138,37.845154],
        //     [55.757138,37.845154],
        //     [55.719255,37.838287],
        //     [55.690625,37.827301],
        //     [55.658875,37.838287],
        //     [55.637953,37.819061],
        //     [55.616243,37.779236],
        //     [55.597626,37.746277],
        //     [55.583657,37.707825]
        // ];
        //
        // polygon = window.map.drawPolygon({
        //     paths: msc, // pre-defined polygon shape
        //     strokeColor: '#62a3c1',
        //     strokeOpacity: 0,
        //     strokeWeight: 3,
        //     fillColor: '#62a3c1',
        //     fillOpacity: 0.3
        // });

        window.points.forEach(function (item) {
            window.mapMarkers[item.idItem] = window.map.addMarker({
                lat: item.arrCoordinate[0],
                lng: item.arrCoordinate[1],
                title: 'map-id-' + item.idItem,
                icon: '/images//point.png',
                infoWindow: {
                    content: '<div id="map-id-' + item.idItem + '" class="inner">' +
                    '<h3 class="inner-title">' + item.name + '</h3>' +
                    item.items +
                    '<p class="inner-phone">' + item.text + '</p>'
                }
            });
        });



    }
}



function init() {
    initMap();
}

$(document).ready(init);