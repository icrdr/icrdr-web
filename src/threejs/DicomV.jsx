import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { NRRDLoader } from "../threejsm/NRRDLoader";
import { VTKLoader } from "../threejsm/VTKLoader";

export default function DicomViewer() {
  const mount = useRef(null);

  useEffect(() => {
    //场景初始化

    const container = mount.current;
    
    let frameId;
    const gui = new dat.GUI();
    const scene = new THREE.Scene();
    var h = 512; // frustum height
    var aspect = container.clientWidth / container.clientHeight;
    var camera = new THREE.PerspectiveCamera(
      30,
      aspect,
      0.1,
      100000
    );
    camera.position.z = 300;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("webgl2");
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: context
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    // const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor("#000000");
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const stats = new Stats();
    renderer.domElement.parentElement.appendChild(stats.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    // 加灯
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    scene.add(dirLight);

    // 加模型
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const loader = new NRRDLoader();
    loader.setPath("./static/model/");
    loader.load("A.nrrd", function(volume) {
      var geometry, material, sliceZ, sliceY, sliceX;
      //box helper to see the extend of the volume
      var geometry = new THREE.BoxBufferGeometry(
        volume.xLength,
        volume.yLength,
        volume.zLength
      );
      console.log(volume)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var group = new THREE.Group();
      scene.add(group);

      var cube = new THREE.Mesh(geometry, material);
      cube.visible = false;
      var box = new THREE.BoxHelper(cube);
      group.add(box);
      box.applyMatrix(volume.matrix);
      group.add(cube);

      //z plane
      sliceZ = volume.extractSlice(
        "z",
        Math.floor(volume.RASDimensions[2] / 2)
      );
      group.add(sliceZ.mesh);
      //y plane
      sliceY = volume.extractSlice(
        "y",
        Math.floor(volume.RASDimensions[1] / 2)
      );
      group.add(sliceY.mesh);
      //x plane
      sliceX = volume.extractSlice(
        "x",
        Math.floor(volume.RASDimensions[0] / 2)
      );
      group.add(sliceX.mesh);

      console.log(volume.offset);
      // group.translateX(-volume.offset[2])
      // group.translateY(-volume.offset[1])
      // group.translateZ(-volume.offset[0])
      // controls.target.set(
      //   -volume.offset[0],
      //   -volume.offset[1],
      //   -volume.offset[2]
      // );

      gui
        .add(sliceX, "index", 0, volume.RASDimensions[0], 1)
        .name("indexX")
        .onChange(function() {
          sliceX.repaint.call(sliceX);
        });
      gui
        .add(sliceY, "index", 0, volume.RASDimensions[1], 1)
        .name("indexY")
        .onChange(function() {
          sliceY.repaint.call(sliceY);
        });
      gui
        .add(sliceZ, "index", 0, volume.RASDimensions[2], 1)
        .name("indexZ")
        .onChange(function() {
          sliceZ.repaint.call(sliceZ);
        });
      gui
        .add(volume, "lowerThreshold", volume.min, volume.max, 1)
        .name("Lower Threshold")
        .onChange(function() {
          volume.repaintAllSlices();
        });
      gui
        .add(volume, "upperThreshold", volume.min, volume.max, 1)
        .name("Upper Threshold")
        .onChange(function() {
          volume.repaintAllSlices();
        });
      gui
        .add(volume, "windowLow", volume.min, volume.max, 1)
        .name("Window Low")
        .onChange(function() {
          volume.repaintAllSlices();
        });
      gui
        .add(volume, "windowHigh", volume.min, volume.max, 1)
        .name("Window High")
        .onChange(function() {
          volume.repaintAllSlices();
        });
    });

    var a_mtl = new THREE.MeshLambertMaterial({
      wireframe: false,
      morphTargets: false,
      side: THREE.DoubleSide,
      color: 0xbd5a5a
    });
    var vtkloader = new VTKLoader();
    vtkloader.setPath("./static/model/");
    vtkloader.load("k_a.vtk", function(geometry) {
      geometry.computeVertexNormals();
      var mesh = new THREE.Mesh(geometry, a_mtl);
      scene.add(mesh);
      var visibilityControl = {
        visible: true
      };
      gui
        .add(visibilityControl, "visible")
        .name("Kindey_A Visible")
        .onChange(function() {
          mesh.visible = visibilityControl.visible;
          renderer.render(scene, camera);
        });
    });

    var k_mtl = new THREE.MeshLambertMaterial({
      wireframe: false,
      morphTargets: false,
      side: THREE.DoubleSide,
      color: 0xb68588
    });
    vtkloader.load("k.vtk", function(geometry) {
      geometry.computeVertexNormals();
      var mesh = new THREE.Mesh(geometry, k_mtl);
      scene.add(mesh);
      var visibilityControl = {
        visible: true
      };
      gui
        .add(visibilityControl, "visible")
        .name("Kindey Visible")
        .onChange(function() {
          mesh.visible = visibilityControl.visible;
          renderer.render(scene, camera);
        });
    });

    var v_mtl = new THREE.MeshLambertMaterial({
      wireframe: false,
      morphTargets: false,
      side: THREE.DoubleSide,
      color: 0xbed7dc
    });
    vtkloader.load("k_v.vtk", function(geometry) {
      geometry.computeVertexNormals();
      var mesh = new THREE.Mesh(geometry, v_mtl);
      scene.add(mesh);
      var visibilityControl = {
        visible: true
      };
      gui
        .add(visibilityControl, "visible")
        .name("Vein Visible")
        .onChange(function() {
          mesh.visible = visibilityControl.visible;
          renderer.render(scene, camera);
        });
    });

    var c_mtl = new THREE.MeshLambertMaterial({
      wireframe: false,
      morphTargets: false,
      side: THREE.DoubleSide,
      color: 0xf2e4e1
    });
    vtkloader.load("k_c.vtk", function(geometry) {
      geometry.computeVertexNormals();
      var mesh = new THREE.Mesh(geometry, c_mtl);
      scene.add(mesh);
      var visibilityControl = {
        visible: true
      };
      gui
        .add(visibilityControl, "visible")
        .name("tumor Visible")
        .onChange(function() {
          mesh.visible = visibilityControl.visible;
          renderer.render(scene, camera);
        });
    });

    controls.enableDamping = true;

    controls.rotateSpeed = 0.2;

    // 动画部分
    const animate = () => {
      controls.update();
      stats.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    //窗口改变
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // 组件删除后清理内容
    return () => {
      // 清理事件监听
      window.removeEventListener("resize", handleResize);

      // 常规清理内容
      cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={{ width: "100%", height: "700px" }} ref={mount} />;
}