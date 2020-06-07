# aframe-InstancedMesh

W.I.P Component for A-Frame entities to leverage threejs InstancedMesh. 

![Example Image](https://github.com/EX3D/aframe-InstancedMesh/blob/master/aframe%20instancedmesh%20Example.jpg)



Component A-Frame to take advantage of threejs instanced rendering. The objective behind this component is reducing the overall number of calls for groups of entities sharing geometry and material while using traditional a-frame notation. Using a higher level of abstaction with InstancedMesh this component will support native geometry as well as imported geometry such as .obj parsing for threejs BufferGeometry.

This leverages type of threejs Mesh (InstancedMesh) and will use (mergeBufferGeometries)

### A-Frame entity notation

```html
   <a-entity  id="Parent" obj-model="obj: #obj" mixin="objmaterial" scale="2 2 2" rotation="0 0 0" position="0 0 0" instancedmesh>
        <a-entity id="Child1" position="-5 0 0"  scale="1 1 1" rotation="0 0 0" geometry="primitive: sphere; radius: 200"></a-entity>
        <a-entity id="Child2" position="-10 0 0" scale="1 1 1" rotation="0 0 0" ></a-entity>
        <a-entity id="Child3" position="-15 0 0" scale="1 1 1" rotation="0 0 0" ></a-entity>       
    </a-entity> 
```
*Child Objects can have placeholder geometry (Ex. Child 1 has shpere geometry) and can be erased by toggling retainChildren.

### How it works and Why

Designed to be used on an HTMLCollection consistent of a parent object and many child objects. This is used for arrays of objects that require precise transformations such as groups of buildings, vehicles and trees (See:Example Image)

- Takes geometry and material of parent entity Oject3D.
- Populates parent Oject3d with number of child entities and corresponding transformations using InstancedMesh of parent geometry and material**.
- Erases parent entityobject3d original geometry.
- Erases children from DOM leaving only parent entity.

**Right now this component creates a .clone() of parent material because of a known threejs limitation.

### Component Schema

| Property | Description | Default Value | Implemented |
| -------- | ----------- | ------------- | ------------|
| `retainParent`    | Retain Parent Geometry | `false` | No |
| `retainChildren`    | Retain Children in DOM | `false` | No |
| `inheritMat`    | Use Parent Material | `false` | No |
| `mergeInstances`    | Merge all instances into one single mesh (This would be used to reduce reuqest animation calls)| `false` | No |
| `frustumCulled` | Culls non visible meshInstances | `true` | No |

## WIP
- Urgent!! Succesfully read child entities´s transformations and set matrix values correspondingly !!!!! Right now transformations are random.
- Implement schema components toggle: Right now behaviro is set to default values.
- Implement mergeInstances using three js BufferGeometryUtils.mergeBufferGeometries
- Allow some kind of randomization for materials and transformations (This is last priority because this has no use  for our main project)
