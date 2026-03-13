import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneService } from '../three-service.service';

@Component({
  selector: 'app-platform',
  standalone: true,
  template: ``
})

export class PlatformComponent implements OnInit {

  constructor(private threeService: ThreeSceneService) {}

  ngOnInit(): void {

    if (!this.threeService.ready)
    {
      setTimeout(() => this.ngOnInit(), 100);
      return;
    }

    // PLATFORM -----------------------------------------------------

    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(15, 0.05, 15),
      new THREE.MeshStandardMaterial({
        color: 0x28213b
      })
    );

    platform.position.set(0, 0, 0);

    this.threeService.addPhysicsObject(
      platform,
      new THREE.Vector3(15, 0.05, 15),
      platform.position
    );

    // CURVED STADIUM WALL (VISUAL) --------------------------------

    const wallHeight = 1.1;
    const bottomRadius = 7;
    const topRadius = 6;
    const segments = 64;

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a96c4,
      side: THREE.DoubleSide
    });

    const stadiumWall = new THREE.Mesh(
      new THREE.CylinderGeometry(
        topRadius,
        bottomRadius,
        wallHeight,
        segments,
        1,
        true
      ),
      wallMaterial
    );

    stadiumWall.position.set(0, wallHeight / 2, 0);

    this.threeService.scene.add(stadiumWall);

    // PHYSICS WALL COLLIDERS --------------------------------------

    const colliderCount = 40;
    const radius = bottomRadius;

    for (let i = 0; i < colliderCount; i++) {

      const angle = (i / colliderCount) * Math.PI * 2;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const wallSize = new THREE.Vector3(2, wallHeight, 1);

      const collider = new THREE.Mesh(
        new THREE.BoxGeometry(wallSize.x, wallSize.y, wallSize.z),
        new THREE.MeshBasicMaterial({ visible: false })
      );

      collider.position.set(x, wallHeight / 2, z);

      collider.lookAt(0, wallHeight / 2, 0);

      this.threeService.addPhysicsObject(
        collider,
        wallSize,
        collider.position
      );
    }
  }
}
