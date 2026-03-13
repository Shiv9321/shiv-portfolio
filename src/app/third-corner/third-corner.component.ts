import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

import { ThreeSceneService } from '../three-service.service';
import { CharacterControllerService } from '../character-controller.service';

@Component({
  selector: 'app-third-corner',
  templateUrl: './third-corner.component.html',
  styleUrl: './third-corner.component.sass'
})

export class ThirdCornerComponent implements OnInit {

  private hoverText!: HTMLDivElement;
  private link = 'https://clockadjustable.netlify.app/';

  private sphere!: THREE.Mesh;

  constructor(
    private threeService: ThreeSceneService,
    private controller: CharacterControllerService
  ) {}

  ngOnInit(): void {

    const wait = setInterval(() => {
      if (this.threeService.ready)
      {
        clearInterval(wait);
        this.createSphere();
        this.createHoverText();
        this.animate();
      }
    }, 100);
  }

  createSphere()
  {
    const geometry = new THREE.SphereGeometry(0.8, 9, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xa80c30 });

    this.sphere = new THREE.Mesh(geometry, material);
    const position = new THREE.Vector3(3.5, 1.5, 2.5);
    this.sphere.position.copy(position);

    this.threeService.addDynamicSphere(
      this.sphere,
      1.2,
      position
    );
  }

  createHoverText()
  {
    this.hoverText = document.createElement('div');
    this.hoverText.innerText = 'Press ENTER to open clockadjustable.netlify.app/';

    Object.assign(this.hoverText.style, {
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '20px',
          display: 'none',
          pointerEvents: 'none'
    });
    document.body.appendChild(this.hoverText);
  }

  checkInteraction()
  {
    const characterPos = this.controller.getCharacterPosition();
    if (!characterPos || !this.sphere) return;

    const distance = characterPos.distanceTo(this.sphere.position);
    const inRange = distance < 2.5;

    this.hoverText.style.display = inRange ? 'block' : 'none';

    if (inRange && this.controller.isKeyPressed('enter'))
    {
      this.controller.resetKey('enter');
      window.open(this.link, '_blank');
    }
  }

  animate = () => {
      requestAnimationFrame(this.animate);
      this.checkInteraction();
  }

}
