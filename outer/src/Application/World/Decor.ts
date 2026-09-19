import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';
import Debug from '../Utils/Debug';

const OFFSET = {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 900,
};

export default class Decor {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    bakedModel: BakedModel;
    group: THREE.Group;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.debug = this.application.debug;

        this.group = new THREE.Group();
        this.group.name = 'decor';
        this.scene.add(this.group);

        this.setModel();
        this.setupDebug();
    }

    setModel() {
        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.decorModel,
            this.resources.items.texture.decorTexture,
            OFFSET.scale
        );

        const model = this.bakedModel.getModel();
        model.traverse((child: any) => {
            if (child.isMesh && child.name.toLowerCase().includes('shell')) {
                child.visible = false;
            }
        });
        this.group.add(model);
        this.applyOffset();
    }

    applyOffset() {
        this.group.position.set(OFFSET.position.x, OFFSET.position.y, OFFSET.position.z);
        this.group.rotation.set(OFFSET.rotation.x, OFFSET.rotation.y, OFFSET.rotation.z);
    }

    setupDebug() {
        if (!this.debug.active) return;

        const folder = this.debug.ui.addFolder('Decor');
        folder.add(OFFSET.position, 'x', -2000, 2000, 1).name('pos X').onChange(() => this.applyOffset());
        folder.add(OFFSET.position, 'y', -2000, 2000, 1).name('pos Y').onChange(() => this.applyOffset());
        folder.add(OFFSET.position, 'z', -2000, 2000, 1).name('pos Z').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'x', -Math.PI, Math.PI, 0.01).name('rot X').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'y', -Math.PI, Math.PI, 0.01).name('rot Y').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'z', -Math.PI, Math.PI, 0.01).name('rot Z').onChange(() => this.applyOffset());
        folder.close();
    }
}
