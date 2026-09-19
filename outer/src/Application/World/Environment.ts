import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';
import Debug from '../Utils/Debug';
import Time from '../Utils/Time';

const OFFSET = {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 900,
};

interface MantaRayState {
    mesh: THREE.Mesh;
    prevX: number;
    prevZ: number;
    phase: number;
    config: {
        centerX: number;
        centerZ: number;
        radiusA: number;
        radiusB: number;
        loopSpeed: number;
        driftAngle: number;
        bobFreq: number;
        bobAmp: number;
        flapFreq: number;
        flapAmp: number;
    };
}

export default class Environment {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    time: Time;
    bakedModel: BakedModel;
    group: THREE.Group;
    mantaRays: MantaRayState[];

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.debug = this.application.debug;
        this.time = this.application.time;

        this.group = new THREE.Group();
        this.group.name = 'environment';
        this.scene.add(this.group);

        this.mantaRays = [];

        this.setModel();
        this.setupDebug();
    }

    setModel() {
        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.environmentModel,
            this.resources.items.texture.environmentTexture,
            OFFSET.scale
        );

        const model = this.bakedModel.getModel();
        this.group.add(model);

        const configs = [
            {
                centerX: -2900, centerZ: 650,
                radiusA: 1200, radiusB: 800,
                loopSpeed: 0.15, driftAngle: 0.3,
                bobFreq: 0.5, bobAmp: 15,
                flapFreq: 1.8, flapAmp: 0.06,
            },
            {
                centerX: -150, centerZ: -1650,
                radiusA: 1000, radiusB: 1400,
                loopSpeed: 0.12, driftAngle: -0.5,
                bobFreq: 0.4, bobAmp: 20,
                flapFreq: 1.5, flapAmp: 0.05,
            },
            {
                centerX: 550, centerZ: 4400,
                radiusA: 900, radiusB: 1100,
                loopSpeed: 0.18, driftAngle: 1.2,
                bobFreq: 0.6, bobAmp: 12,
                flapFreq: 2.0, flapAmp: 0.07,
            },
        ];

        let idx = 0;
        model.traverse((child: any) => {
            if (child.isMesh && child.name.toLowerCase().includes('manta')) {
                const config = configs[idx % configs.length];
                this.mantaRays.push({
                    mesh: child,
                    prevX: 0,
                    prevZ: 0,
                    phase: (idx / 3) * Math.PI * 2,
                    config,
                });
                idx++;
            }
        });

        this.applyOffset();
    }

    applyOffset() {
        this.group.position.set(OFFSET.position.x, OFFSET.position.y, OFFSET.position.z);
        this.group.rotation.set(OFFSET.rotation.x, OFFSET.rotation.y, OFFSET.rotation.z);
    }

    setupDebug() {
        if (!this.debug.active) return;

        const folder = this.debug.ui.addFolder('Environment');
        folder.add(OFFSET.position, 'x', -2000, 2000, 1).name('pos X').onChange(() => this.applyOffset());
        folder.add(OFFSET.position, 'y', -2000, 2000, 1).name('pos Y').onChange(() => this.applyOffset());
        folder.add(OFFSET.position, 'z', -2000, 2000, 1).name('pos Z').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'x', -Math.PI, Math.PI, 0.01).name('rot X').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'y', -Math.PI, Math.PI, 0.01).name('rot Y').onChange(() => this.applyOffset());
        folder.add(OFFSET.rotation, 'z', -Math.PI, Math.PI, 0.01).name('rot Z').onChange(() => this.applyOffset());
        folder.close();
    }

    update() {
        const t = this.time.elapsed * 0.001;

        for (const ray of this.mantaRays) {
            const c = ray.config;
            const angle = ray.phase + t * c.loopSpeed;

            const cosD = Math.cos(c.driftAngle);
            const sinD = Math.sin(c.driftAngle);
            const localX = Math.sin(angle) * c.radiusA;
            const localZ = Math.cos(angle) * c.radiusB + Math.sin(angle * 2) * c.radiusB * 0.3;

            const worldX = c.centerX + localX * cosD - localZ * sinD;
            const worldZ = c.centerZ + localX * sinD + localZ * cosD;
            const worldY = Math.sin(t * c.bobFreq + ray.phase) * c.bobAmp;

            ray.mesh.position.set(worldX, worldY, worldZ);

            const dx = worldX - ray.prevX;
            const dz = worldZ - ray.prevZ;
            if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) {
                const heading = Math.atan2(dx, dz);
                ray.mesh.rotation.y = heading;
            }

            const turnRate = Math.cos(angle) * c.loopSpeed * c.radiusA;
            ray.mesh.rotation.z = -turnRate * 0.0003;

            ray.mesh.rotation.x = Math.sin(t * c.flapFreq + ray.phase) * c.flapAmp;

            ray.prevX = worldX;
            ray.prevZ = worldZ;
        }
    }
}
