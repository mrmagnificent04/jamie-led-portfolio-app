import * as THREE from 'three';

export default class BakedModel {
    model: LoadedModel;
    texture: LoadedTexture;
    material: THREE.MeshBasicMaterial;

    constructor(model: LoadedModel, texture: LoadedTexture, scale?: number) {
        this.model = model;
        this.texture = texture;

        this.texture.flipY = false;
        this.texture.encoding = THREE.sRGBEncoding;

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        });

        this.model.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (scale) child.scale.set(scale, scale, scale);

                const mat = child.material as THREE.MeshStandardMaterial;
                const name = child.name.toLowerCase();
                const matName = (mat.name || '').toLowerCase();

                if (name.includes('screen') || matName.includes('crt') || matName.includes('glass')) {
                    child.material = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: 0,
                        side: THREE.DoubleSide,
                        blending: THREE.NoBlending,
                    });
                } else if (mat.transparent) {
                    const hasVertexColors = !!child.geometry.attributes.color;
                    child.material = new THREE.MeshBasicMaterial({
                        color: hasVertexColors ? 0xffffff : mat.color,
                        vertexColors: hasVertexColors,
                        transparent: true,
                        opacity: mat.opacity > 0 ? mat.opacity : 0.5,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                    });
                } else if (child.geometry.attributes.color && !mat.map) {
                    child.material = new THREE.MeshBasicMaterial({
                        vertexColors: true,
                        side: THREE.DoubleSide,
                    });
                } else if (mat.map) {
                    child.material = this.material;
                } else {
                    child.material = new THREE.MeshBasicMaterial({
                        color: mat.color,
                        side: THREE.DoubleSide,
                    });
                }
            }
        });

        return this;
    }

    getModel(): THREE.Group {
        return this.model.scene;
    }
}
