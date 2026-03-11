import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ThreeSceneService } from './three-service.service';
import { PlatformComponent } from './platform/platform.component';
import { CharacterComponent } from './character/character.component';
import { FirstCornerComponent } from "./first-corner/first-corner.component";
import { SecondCornerComponent } from './second-corner/second-corner.component';
import { ThirdCornerComponent } from './third-corner/third-corner.component';
import { FourthCornerComponent } from './fourth-corner/fourth-corner.component';
import { SkyComponent } from './sky/sky.component';

@Component({
  selector: 'app-root',
  imports: [
    PlatformComponent,
    CharacterComponent,
    FirstCornerComponent,
    SecondCornerComponent,
    ThirdCornerComponent,
    FourthCornerComponent,
    SkyComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})

export class AppComponent implements AfterViewInit {

  @ViewChild('canvasContainer', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  constructor(private threeService: ThreeSceneService) {}

  ngAfterViewInit(): void {
    this.threeService.init(this.containerRef);
  }
}
