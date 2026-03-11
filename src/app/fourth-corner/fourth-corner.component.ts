import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneService } from '../three-service.service';
import RAPIER from '@dimforge/rapier3d-compat';

@Component({
  selector: 'app-fourth-corner',
  templateUrl: './fourth-corner.component.html',
  styleUrl: './fourth-corner.component.sass'
})
export class FourthCornerComponent implements OnInit {


    private hoverText!: HTMLDivElement;
    private link = 'https://github.com/Shiv9321';

       private sphere!: THREE.Mesh;

       constructor(private threeService: ThreeSceneService) {}

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

       createSphere() {

         const geometry = new THREE.SphereGeometry(1.2, 32, 32);
         const material = new THREE.MeshStandardMaterial({ color: 0xc7c73a });

         const sphere = new THREE.Mesh(geometry, material);
         this.sphere = sphere;

         const position = new THREE.Vector3(-1.5, 1.5, 3.5);

         sphere.position.copy(position);

         this.threeService.addDynamicSphere(
           sphere,
           1.2,
           position
         );
       }

       createHoverText() {

         this.hoverText = document.createElement('div');

         this.hoverText.innerText = 'Press ENTER to open github.com/Shiv9321';

         this.hoverText.style.position = 'absolute';
         this.hoverText.style.bottom = '80px';
         this.hoverText.style.left = '50%';
         this.hoverText.style.transform = 'translateX(-50%)';
         this.hoverText.style.color = 'white';
         this.hoverText.style.fontSize = '20px';
         this.hoverText.style.display = 'none';
         this.hoverText.style.pointerEvents = 'none';

         document.body.appendChild(this.hoverText);
       }

       checkInteraction() {

         const characterPos = this.threeService.getCharacterPosition();

         if (!characterPos || !this.sphere) return;

         const distance = characterPos.distanceTo(this.sphere.position);

         const inRange = distance < 2.5;

         if (inRange)
           this.hoverText.style.display = 'block';
         else
           this.hoverText.style.display = 'none';

         if (inRange && this.threeService.isKeyPressed('enter'))
         {
           this.threeService.resetKey('enter');
           window.open(this.link, '_blank');
         }
       }

       animate = () => {
         requestAnimationFrame(this.animate);
         this.checkInteraction();
       }

     }
