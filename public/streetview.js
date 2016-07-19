AFRAME.registerComponent('streetview', {
    init: function() {
        var loader = new GSVPANO.PanoLoader();
        var fov = 70;
        var lat = 54.552083679428065, lon = -3.297380963134742;
        var self = this;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                lat = position.coords.latitude;
                lon = position.coords.longitude;
                var canvas = document.createElement('canvas');
                var ctxt = canvas.getContext('2d');

                var geometry = new THREE.SphereGeometry(500, 60, 40);
                var material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('placeholder.jpg')});
                material.side = THREE.DoubleSide;
                var mesh = new THREE.Mesh(geometry, material);
                mesh.doubleSided = true;

                material = new THREE.MeshBasicMaterial({ color: 0xff0000});

                loader.onPanoramaLoad = function() {
                    mesh.material.map = new THREE.Texture(this.canvas);
                    mesh.material.map.needsUpdate = true; 

                    self.el.setObject3D('mesh', mesh);
                };

                loader.load(new google.maps.LatLng(lat, lon));
            });
        }

    }
});
