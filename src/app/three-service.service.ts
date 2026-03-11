import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

@Injectable({
  providedIn: 'root'
})

export class ThreeSceneService {

  public ready = false;

  private container!: HTMLElement;

  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;

  private character?: THREE.Object3D;
  public interactiveObjects: THREE.Object3D[] = [];

  private keys: { [key: string]: boolean } = {};
  private moveSpeed = 10;

  // for physics
  public world!: RAPIER.World;
  private characterBody!: RAPIER.RigidBody;

  private physicsObjects: {
    mesh: THREE.Object3D,
    body: RAPIER.RigidBody
  }[] = [];

  // camera rotation
  private cameraAngle = 0;
  private isDragging = false;
  private previousMouseX = 0;

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

    // lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemi.position.set(0, 20, 0);
    this.scene.add(hemi);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    this.setupKeyboard();
    this.setupMouseControls();

    this.ready = true;

    this.animate();
  }

  isKeyPressed(key: string)
  {
    return this.keys[key.toLowerCase()];
  }

  resetKey(key: string)
  {
    this.keys[key.toLowerCase()] = false;
  }

  getCharacterPosition(): THREE.Vector3 | null
  {
    if (!this.character) return null;
    return this.character.position;
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

  setCharacter(object: THREE.Object3D) {

    this.character = object;

    this.scene.add(object);

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
                    .setTranslation(object.position.x, object.position.y, object.position.z)
                    .lockRotations()
                    .setLinearDamping(6)
                    .setAngularDamping(5);

    this.characterBody = this.world.createRigidBody(bodyDesc);

    // const collider = RAPIER.ColliderDesc.capsule(0.4, 0.3);

    const collider = RAPIER.ColliderDesc.capsule(0.4, 0.3)
                      .setDensity(5)       // heavier character
                      .setFriction(2.0)    // better ground grip
                      .setRestitution(0);  // no bouncing

    this.world.createCollider(collider, this.characterBody);
  }

  private setupKeyboard() {

    window.addEventListener('keydown', e =>
      this.keys[e.key.toLowerCase()] = true
    );

    window.addEventListener('keyup', e =>
      this.keys[e.key.toLowerCase()] = false
    );
  }

  private setupMouseControls() {

    this.renderer.domElement.addEventListener('mousedown', (event) => {
      this.isDragging = true;
      this.previousMouseX = event.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (event) => {

      if (!this.isDragging) return;

      const deltaX = event.clientX - this.previousMouseX;

      this.previousMouseX = event.clientX;

      this.cameraAngle -= deltaX * 0.005;
    });
  }

  private updateCharacter() {

    if (!this.character) return;

    let moveX = 0;
    let moveZ = 0;

    if (this.keys['w']) moveZ -= 1;
    if (this.keys['s']) moveZ += 1;
    if (this.keys['a']) moveX -= 1;
    if (this.keys['d']) moveX += 1;

    this.characterBody.setLinvel({
      x: moveX * this.moveSpeed,
      y: -3,
      z: moveZ * this.moveSpeed
      // y: velocity.y,
    }, true);

    const pos = this.characterBody.translation();

    this.character.position.set(pos.x, pos.y-0.7, pos.z);

    // rotate character toward movement
    if (moveX !== 0 || moveZ !== 0)
    {
      const angle = Math.atan2(moveX, moveZ);
      this.character.rotation.y = angle;
    }

    this.updateCamera();
  }

  private updateCamera() {

    if (!this.character) return;

    const radius = 6;
    const height = 3;

    const camX =
      this.character.position.x +
      Math.sin(this.cameraAngle) * radius;

    const camZ =
      this.character.position.z +
      Math.cos(this.cameraAngle) * radius;

    this.camera.position.set(camX, height, camZ);

    this.camera.lookAt(this.character.position);
  }

  addDynamicSphere(mesh: THREE.Mesh, radius: number, position: THREE.Vector3) {

  this.scene.add(mesh);

  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(position.x, position.y, position.z)
    .setLinearDamping(0.2)
    .setAngularDamping(0.2);

  const body = this.world.createRigidBody(bodyDesc);

  const collider = RAPIER.ColliderDesc.ball(radius)
    .setFriction(1.5)
    .setRestitution(0.2);

  this.world.createCollider(collider, body);

  this.physicsObjects.push({
    mesh,
    body
  });
}

  private animate = () => {

    requestAnimationFrame(this.animate);

    this.world.step();
    this.updateCharacter();

      this.physicsObjects.forEach(obj => {

    const pos = obj.body.translation();
    const rot = obj.body.rotation();

    obj.mesh.position.set(pos.x, pos.y, pos.z);
    obj.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);

  });


    this.renderer.render(this.scene, this.camera);
  };
}

