import { Component, OnInit } from '@angular/core';
import { ThreeSceneService } from '../three-service.service';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.sass'
})

export class CharacterComponent implements OnInit {

  constructor(private threeService: ThreeSceneService) {}

  ngOnInit(): void
  {
    const loader = new GLTFLoader();

    loader.load('assets/test-1.glb', (gltf) => {

      const model = gltf.scene;

      model.scale.set(0.4,0.4,0.4);
      model.position.set(0,0.8,0);

      this.threeService.setCharacter(model);

    },
    undefined, (error) => {
      console.error("MODEL FAILED", error);
    });
  }
}
