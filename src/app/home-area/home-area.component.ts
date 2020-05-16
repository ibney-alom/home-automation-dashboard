import { OnDestroy, Component, OnInit, Input, ViewChild, ElementRef, HostListener, NgZone} from '@angular/core';
import * as THREE from 'three';
import "./js/EnableThreeExamples";
import $ from "jquery";


@Component({
  selector: 'app-home-area',
  templateUrl: './home-area.component.html',
  styleUrls: ['./home-area.component.scss']
})

export class HomeAreaComponent implements OnInit{

  @Input() devices:any;
  
  spotlight = new THREE.SpotLight(0xF5FC5A);
  pointlight = new THREE.PointLight(0xffffff);

  constructor(){
  }
  ngOnInit() {
    this.canvasHome();
  }
  ngDoCheck(){
    if(this.devices[0]['on']){
      this.spotlight.intensity = 1.0;
    } else this.spotlight.intensity = 0.0;
    
    if(this.devices[1]['on']){
      this.pointlight.intensity = 1.0;
    } else this.pointlight.intensity = 0.0;
  }

  canvasHome(){
    var _self = this;
    $(function(){
        var scene = new THREE.Scene();
      
        var aspect = window.innerWidth / window.innerHeight;
        var d = 2.5;
        var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        //var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
      
        camera.position.set(4, 3, 3); // all components equal
        camera.lookAt( scene.position ); // or the origin
      
        // var axis = new THREE.AxisHelper(10);
        // scene.add(axis);
      
        var renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x141A35);
        renderer.setSize(window.innerWidth - ((window.innerWidth/12)*5), 580);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
      
        var loader = new THREE.JSONLoader();
        loader.load('assets/json/data.json', handle_load);
        function handle_load(geometry,materials) {
          var obj = new THREE.Mesh(
            geometry,
            materials
          );
          obj.receiveShadow = true;
          obj.castShadow = true;
          scene.add(obj);
        }
      
        var screen = new THREE.Mesh(
          new THREE.PlaneGeometry(.31,.25,.85),
          new THREE.MeshStandardMaterial({emissive: 0x141A35})
        );
        screen.position.set(1.8,.84,1.32);
        scene.add(screen);
      
        light();
      
        function light() {
      
          // _self.spotlight = new THREE.SpotLight(0xF5FC5A);
          _self.spotlight.position.set(1.75, 4, -3);
          _self.spotlight.castShadow = true;
          if(_self.devices[0]['on']){
            _self.spotlight.intensity = 1.0;
          } else _self.spotlight.intensity = 0.0;
          scene.add(_self.spotlight);
      
          var dirlight = new THREE.DirectionalLight(0xfdd8ff);
          dirlight.position.set(-.96,3,-.75);
          //dirlight.castShadow = true;
          dirlight.intensity = 0.2;
          scene.add(dirlight);
      
          var ambi = new THREE.AmbientLight(0x0e1642);
          scene.add(ambi);
      
          // _self.pointlight = new THREE.PointLight(0xffffff);
          _self.pointlight.position.set(.63,.72,.71);
          //pointlight.castShadow = true;
          if(_self.devices[1]['on']){
            _self.pointlight.intensity = 1.0;
          } else _self.pointlight.intensity = 0.0;
          
          scene.add(_self.pointlight);
        }
      
        function update() {
          renderer.render(scene,camera);
          requestAnimationFrame(update);
        }
      
        $('#webGL-container').append(renderer.domElement);
        renderer.render(scene, camera);
        update();
      })
  }
}
