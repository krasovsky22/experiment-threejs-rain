import * as THREE from "three";
import smokePng from "./assets/smoke.png";

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

class VelocityVector extends THREE.Vector3 {
  velocity: number = 0;
}

class VelocityGeometry extends THREE.Geometry {
  vertices: VelocityVector[] = [];
}

class RainAnimation<HTMLDivElement> {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    60,
    canvasWidth / canvasHeight,
    1,
    1000
  );
  private cloudRefs: THREE.Mesh[] = [];
  private renderer = new THREE.WebGLRenderer();
  private cloudsNumber: number = 50;

  //lightning
  private flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);

  //rain
  private rainGeo = new VelocityGeometry();
  private rainCount: number = 15000;
  private rain = new THREE.Points();

  constructor(elementRef: Node) {
    this.setUpCamera();
    this.setUpRenderer();

    //add light
    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);

    this.scene.add(directionalLight);

    //add some fog to the scene
    this.scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);

    //add rendered to element
    elementRef.appendChild(this.renderer.domElement);

    this.setUpTextures();

    //add lightning
    this.flash.position.set(200, 300, 100);
    this.scene.add(this.flash);

    this.setUpRain();

    window.addEventListener("resize", this.onWindowResize, false);

    this.animate();
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //setup camera position
  setUpCamera(): void {
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;
  }

  //setup renderer
  setUpRenderer = () => {
    this.renderer.setSize(canvasWidth, canvasHeight);
  };

  //setup rain
  setUpRain = () => {
    for (let i = 0; i < this.rainCount; i++) {
      const rainDrop = new VelocityVector(
        Math.random() * 800 - 200,
        Math.random() * 1000,
        Math.random() * 1000 - 200
      );

      //animate raindrops
      rainDrop.velocity = 0;
      this.rainGeo.vertices.push(rainDrop);
    }

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.3,
      transparent: true
    });

    this.rain = new THREE.Points(this.rainGeo, rainMaterial);
    this.scene.add(this.rain);
  };

  //setup textures
  setUpTextures = () => {
    const loader = new THREE.TextureLoader();
    loader.load(smokePng, texture => {
      const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6
      });

      //add cloud objects to the scene
      for (let i = 0; i < this.cloudsNumber; i++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );

        //add rotation to face the camera
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;

        //add cloud to the scene
        this.cloudRefs.push(cloud);
        this.scene.add(cloud);
      }
    });
  };

  animate = () => {
    this.cloudRefs.forEach(cloud => {
      cloud.rotation.z -= 0.002;
    });

    //rain make it drop
    this.rainGeo.vertices.forEach(drop => {
      drop.velocity -= 0.1 + Math.random() * 0.1;
      drop.y += drop.velocity;

      if (drop.y < -200) {
        drop.y = 200;
        drop.velocity = 0;
      }
    });
    this.rainGeo.verticesNeedUpdate = true;

    //add small rotation to rain objects to create cinematic affect
    this.rain.rotation.y += 0.002;

    if (Math.random() > 0.93 || this.flash.power > 100) {
      if (this.flash.power < 100) {
        this.flash.position.set(
          Math.random() * 400,
          399 + Math.random() * 200,
          100
        );
      }

      this.flash.power = 50 + Math.random() * 500;
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };
}

export default RainAnimation;
