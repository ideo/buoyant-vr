AFRAME.registerComponent('water', {
    schema: { type: 'vec2' },

    init: function() {
        var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 600, 600);

        var waterNormals = new THREE.TextureLoader().load('waternormals.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

        var camera = new THREE.PerspectiveCamera(55.0, window.innerWidth / window.innerHeight, 0.5, 3000000);
		camera.position.set(1000, 500, -1500);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.water = new THREE.Water(null, camera, null, {
			textureWidth: 256,
			textureHeight: 256,
			waterNormals: waterNormals,
			alpha: 	0.9,
			sunDirection: directionalLight.position.normalize(),
			sunColor: 0xffffff,
			waterColor: 0xA3E2F7,
			betaVersion: 0,
			side: THREE.DoubleSide
		});

        this.meshMirror = new THREE.Mesh(new THREE.PlaneBufferGeometry(3000, 3000, 1, 1), this.water.material);
        this.meshMirror.add(this.water);
		this.meshMirror.rotation.x = - Math.PI * 0.5;

        this.el.setObject3D('mesh', this.meshMirror);
        this.el.setObject3D('light', directionalLight);
    },

    tick: function() {
		this.water.material.uniforms.time.value += 1.0 / 60.0;

        if ( this.water.matrixNeedsUpdate ) {
            this.water.updateTextureMatrix();
        }

        this.water.matrixNeedsUpdate = true;
        this.water.material.visible = false;

        var renderTexture = this.water.texture;
        this.water.material.visible = true;
        this.water.material.uniforms.mirrorSampler.value = renderTexture;
        this.el.setObject3D('material', this.water.material);
    }
});

