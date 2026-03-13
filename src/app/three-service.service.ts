import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { CharacterControllerService } from './character-controller.service';

@Injectable({
  providedIn: 'root'
})

export class ThreeSceneService {

public ready = false;

  private container!: HTMLElement;

  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;

  public world!: RAPIER.World;

  private physicsObjects: {
    mesh: THREE.Object3D,
    body: RAPIER.RigidBody
  }[] = [];

  constructor(private controller: CharacterControllerService) {}

  async init(containerRef: ElementRef<HTMLDivElement>) {

    this.container = containerRef.nativeElement;

    await RAPIER.init();

    this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    this.container.appendChild(this.renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemi.position.set(0, 20, 0);
    this.scene.add(hemi);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    this.controller.init(this.renderer);

    this.ready = true;

    this.animate();
  }

  setCharacter(object: THREE.Object3D) {

    this.scene.add(object);

    this.controller.setCharacter(object, this.world);
  }

  addPhysicsObject(mesh: THREE.Mesh, size: THREE.Vector3, position: THREE.Vector3) {

    this.scene.add(mesh);

    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(position.x, position.y, position.z);

    const body = this.world.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.cuboid(
      size.x / 2,
      size.y / 2,
      size.z / 2
    );

    this.world.createCollider(colliderDesc, body);

    this.physicsObjects.push({ mesh, body });
  }

  addDynamicSphere(mesh: THREE.Mesh, radius: number, position: THREE.Vector3) {

    this.scene.add(mesh);

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(position.x, position.y, position.z);

    const body = this.world.createRigidBody(bodyDesc);

    const collider = RAPIER.ColliderDesc.ball(radius);

    this.world.createCollider(collider, body);

    this.physicsObjects.push({ mesh, body });
  }

  private animate = () => {

    requestAnimationFrame(this.animate);

    this.world.step();

    this.controller.update(this.camera);

    this.physicsObjects.forEach(obj => {

      const pos = obj.body.translation();
      const rot = obj.body.rotation();

      obj.mesh.position.set(pos.x, pos.y, pos.z);
      obj.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    });

    this.renderer.render(this.scene, this.camera);
  };

}
