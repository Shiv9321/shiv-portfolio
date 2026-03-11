import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneService } from '../three-service.service';

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrl: './sky.component.sass'
})
export class SkyComponent implements OnInit {

  constructor(private threeService: ThreeSceneService) {}

  ngOnInit(): void {

    if (!this.threeService.ready)
    {
      setTimeout(() => this.ngOnInit(), 100);
      return;
    }

    // ===== SKY DOME =====
    const skyGeometry = new THREE.SphereGeometry(200, 64, 64);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x000011,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    this.threeService.scene.add(sky);

    // ===== STARS =====
    const starCount = 3750;
    const starGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < starCount; i++) {

      const x = (Math.random() - 0.6) * 400;
      const y = Math.random() * 1000 - 100;
      const z = (Math.random() - 0.7) * 400;

      positions.push(x, y, z);
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.threeService.scene.add(stars);
  }
}
