AFRAME.registerComponent('instancedmesh', {
    schema: {
    retainParent: {default: false},
    retainChildren: {default: false},
    inheritMat: {default: true},
    mergeInstances: {default: false},
    frustumCulled: {default: true}
    },

    init: function () {
        
    },

    update: function () {
        
        
		var randomizeMatrix = function () {

			var position = new THREE.Vector3();
			var rotation = new THREE.Euler();
			var quaternion = new THREE.Quaternion();
			var scale = new THREE.Vector3();

			return function ( matrix ) {

				position.x = 0;
				position.y = 0;
				position.z = 0;

				rotation.x = Math.random() * 2 * Math.PI;
				rotation.y = Math.random() * 2 * Math.PI;
				rotation.z = Math.random() * 2 * Math.PI;

				quaternion.setFromEuler( rotation );

				scale.x = scale.y = scale.z = 1;

				matrix.compose( position, quaternion, scale );

			};

		}();
        
        var el = this.el;
        var quantity = this.el.childElementCount;
        
        let mesh = this.el.getObject3D('mesh')
        if (!mesh) {
            this.el.addEventListener('model-loaded', e => {
            this.update.call(this, this.data)
            })
            return;
        }     
        var material = mesh.material.clone();
    
        
        mesh.traverse(function(node) {
            if(node.type != "Mesh") return;
            geometry = node.geometry;
        })
        
        let amesh = new THREE.InstancedMesh(geometry,material,quantity); 
        
        
        for ( i = 0; i < quantity; i ++ ) {  
            matrix = new THREE.Matrix4();
            randomizeMatrix( matrix );
            amesh.setMatrixAt( i, matrix );
        }
        
        this.el.object3D.add(amesh);
        this.el.object3D.remove(mesh);
    },
});
