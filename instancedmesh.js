AFRAME.registerComponent('instancedmesh', {
    schema: {
    retainParent: {default: false},
    retainChildren: {default: false},//Not yet implemented
    inheritMat: {default: true},
    mergeInstances: {default: false},//Not yet implemented
    frustumCulled: {default: true}
    },

    init: function () {
    },
    update: function () { 
        var self = this;
        var el = this.el;
        var list = this.el.children;
        var quantity = 0;
        
        var applyMatrix = function () {
            var position = new THREE.Vector3();
            var rotation = new THREE.Euler();
            var scale = new THREE.Vector3();
            var quaternion = new THREE.Quaternion();  
            return function ( i, matrix ) { 
                position.x = el.children[i].components.position.data.x;
                position.y = el.children[i].components.position.data.y;
                position.z = el.children[i].components.position.data.z;
                rotation.x = el.children[i].components.rotation.data.x;
                rotation.y = el.children[i].components.rotation.data.y;
                rotation.z = el.children[i].components.rotation.data.z;
                quaternion.setFromEuler( rotation );
                scale.x = el.children[i].components.scale.data.x;
                scale.y = el.children[i].components.scale.data.y;
                scale.z = el.children[i].components.scale.data.z;
                matrix.compose( position, quaternion, scale );
            } //High verbosity because imma N00b don´t know how to access matrix on an uninitialized object 
        }();  
        for (var item of list) {
           quantity = quantity + 1;
        }    
        var mesh = this.el.getObject3D('mesh')
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
        
        var amesh = new THREE.InstancedMesh(geometry,material,quantity); 
      
        for ( i = 0; i < quantity; i ++ ) {  
            matrix = new THREE.Matrix4();
            child = this.el.children[i];
            applyMatrix (i,matrix);
            amesh.setMatrixAt( i, matrix );
        } 
        //frustumCulled
        amesh.frustumCulled = this.data.frustumCulled;     
        this.el.object3D.add(amesh);
        // retainParent
        if (!self.data.retainParent) { this.el.object3D.remove(mesh); }
        // inheritMat (Set material attribute to cloned material)
        if (self.data.inheritMat) {
            this.el.components.material.material = material;
        }
    },
});
