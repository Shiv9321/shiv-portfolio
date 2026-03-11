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

    // PLATFORM -------------------------------------------------------------------------

    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(15, 0.05, 15),
      new THREE.MeshStandardMaterial({ color: 0x735d6c })
    );

    platform.position.set(0, 0, 0);

    this.threeService.addPhysicsObject(
      platform,
      new THREE.Vector3(15, 0.05, 15),
      platform.position
    );

    // WALLS -------------------------------------------------------------------------

    //Walls Color
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x85a4d6});

    // BACK WALL----------------------------------------------------------------------------
    const backSideWallSize = new THREE.Vector3(14.5, 1, 0.1);
    const backSideWall = new THREE.Mesh(
      new THREE.BoxGeometry(backSideWallSize.x, backSideWallSize.y, backSideWallSize.z),
      wallMaterial
    );
    backSideWall.position.set(0, 0.5, -7.3);
    this.threeService.addPhysicsObject(backSideWall, backSideWallSize, backSideWall.position);

    // FRONT WALL----------------------------------------------------------------------------
    const frontSideWallSize = new THREE.Vector3(14.5, 1, 0.1);
    const frontSideWall = new THREE.Mesh(
      new THREE.BoxGeometry(frontSideWallSize.x, frontSideWallSize.y, frontSideWallSize.z),
      wallMaterial
    );

    frontSideWall.position.set(0, 0.5, 7.3);
    this.threeService.addPhysicsObject(frontSideWall,frontSideWallSize,frontSideWall.position);

    //RIGHT WALL----------------------------------------------------------------------------
    const rightSideWallSize = new THREE.Vector3(0.1, 3, 14.5);
    const rightSideWall = new THREE.Mesh(
        new THREE.BoxGeometry(rightSideWallSize.x, rightSideWallSize.y, rightSideWallSize.z),
        wallMaterial
    );
    rightSideWall.position.set(7.3, 1.5, 0);
    this.threeService.addPhysicsObject(rightSideWall,rightSideWallSize,rightSideWall.position);

    //LEFT WALL----------------------------------------------------------------------------
    const leftSideWallSize = new THREE.Vector3(0.1, 3, 14.5);
    const leftSideWall = new THREE.Mesh(
        new THREE.BoxGeometry(leftSideWallSize.x, leftSideWallSize.y, leftSideWallSize.z),
        wallMaterial
    );
    leftSideWall.position.set(-7.3, 1.5, 0);
    this.threeService.addPhysicsObject(leftSideWall,leftSideWallSize,leftSideWall.position);
  }
}
