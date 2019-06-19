var canvasParent = $("#canvas-container");
var renderer, scene, camera;
var stats, gui;
var raycaster, mouse;
var grp;
var intersectObj = []
var setting = {
  selected: 0,
  "Kindey Artery": true,
  "Kindey Vein": true,
  "Kindey(left)": true,
  "Kindey(right)": true,
  "Tumor": true,
}
var obj_list = [
  {
    filename: 'k_a',
    name: "Kindey Artery",
  },
  {
    filename: 'k_v',
    name: "Kindey Vein",
  },
  {
    filename: 'k_l',
    name: "Kindey(left)",
  },
  {
    filename: 'k_r',
    name: "Kindey(right)",
  },
  {
    filename: 'k_c',
    name: "Tumor",
  },
];

//PROGRESS
var progress_meta = 0;
var current_progress = 0;
var progress_interval = setInterval(progress, 1);

function progress() {
  if (progress_meta < current_progress) {
    progress_meta++;
    $("#prograss-meta").html(parseFloat(progress_meta) + "%");
  }

  if (progress_meta >= 100) {
    window.clearInterval(progress_interval);
    $("#mask-container").hide(500);
  }
}

function col2Hex(col_str) {
  return col_str.replace('#', '0x')
}

function deleteObj(arr, obj) {
  index = arr.indexOf(obj)
  if (index != -1) arr.splice(index, 1)
  return arr
}
function addObj(arr, obj) {
  index = arr.indexOf(obj)
  if (index == -1) arr.push(obj)
  return arr
}

function UpdateDisplay() {
  if (setting['selected'] > 0) {
    if (!setting[obj_list[setting['selected'] - 1].name]) {
      setting['selected'] = 0
      $("#info-text").html("")
    }
  }

  for (i in obj_list) {
    let show = setting[obj_list[i].name]
    let mtl = obj_list[i]['mtl']
    let obj = obj_list[i]['obj']
    mtl.color.setHex(col2Hex('#999999'))

    //show it or not
    if (show != null) {
      if (setting['selected'] < 3 && setting['selected'] > 0) {
        if (show == false) {
          intersectObj = deleteObj(intersectObj, obj)
          obj.visible = false
        } else {
          intersectObj = addObj(intersectObj, obj)
          obj.visible = true
          mtl.transparent = true
          mtl.opacity = 0.5
        }
      } else {
        obj.visible = true
        if (show == false) {
          intersectObj = deleteObj(intersectObj, obj)
          mtl.transparent = true
          mtl.opacity = 0.2
        } else {
          intersectObj = addObj(intersectObj, obj)
          mtl.transparent = false
          mtl.opacity = 1.0
        }
      }
    }
  }


  if (setting['selected'] > 0) {
    s_mtl = obj_list[setting['selected'] - 1]['mtl']
    s_mtl.color.setHex(col2Hex('#eeeeee'))
    s_mtl.transparent = false
    s_mtl.opacity = 1.0
    str = obj_list[setting['selected'] - 1].name
    $("#info-text").html(str)
  }
}

init();
animate();

function init() {
  //INIT
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0xffffff, 0);
  renderer.setSize(canvasParent.width(), canvasParent.height());
  $("#canvas-container").append(renderer.domElement);
  renderer.shadowMap.enabled = false;

  //SCENE
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(20, canvasParent.width() / canvasParent.height(), 0.1, 10000);
  camera.position.set(0, 0, -10);
  scene.add(camera);
  //HELPER
  var helper = new THREE.GridHelper(1000, 40, 0x303030, 0x303030);
  //scene.add(helper);

  //LIGHT
  var DLight = new THREE.PointLight(0xffffff, 0.3);
  DLight.position.set(-5, 10, 3);
  var Alight = new THREE.AmbientLight(0xffffff, 0.9); // soft white light
  camera.add(DLight);
  camera.add(Alight);

  //OBJECT
  var manager = new THREE.LoadingManager();
  var objloader = new THREE.OBJLoader(manager);

  manager.onLoad = function () {
    console.log('Loading complete!');
    liver.position.set(-0.8, -1, 0.8);
    liver.scale.set(0.07, 0.07, 0.07);
    liver.rotation.set(-1.6, 0, 0);
    UpdateDisplay()
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    current_progress = itemsLoaded / itemsTotal * 100;

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  };

  liver = new THREE.Group();
  scene.add(liver);

  objloader.setPath('./obj/kindey/');


  for (i in obj_list) {
    let filename = obj_list[i].filename + '.obj'
    objloader.load(filename, function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          
          child.material = new THREE.MeshLambertMaterial();
          child.material.color.setHex(col2Hex('#ffffff'))
          
          for (j in obj_list) {
            if (obj_list[j].filename === child.name) {
              obj_list[j]['mtl'] = child.material
              obj_list[j]['obj'] = child
            }
          }
          liver.add(child);
          intersectObj.push(child)
        }
      });
    });
  }


  //STATS
  // --------------------------------------------
  stats = new Stats();
  //$("#canvas-container").append(stats.dom);
  $(stats.domElement).attr("style", "position:absolute; top:0; left:0");

  // GUI
  // --------------------------------------------
  var JSON = {
    "remembered": {
      "Default": {
        "0": {
          "Kindey Artery": true,
          "Kindey Vein": true, 
          "Kindey(left)": true,
          "Kindey(right)": true,
          "Tumor": true,
        }
      },
      "Tumor v1": {
        "0": {
          "Kindey Artery": true,
          "Kindey Vein": true,
          "Kindey(left)": false,
          "Kindey(right)": false,
          "Tumor": true,
        }
      },
    },
    "preset": "Default",
    "closed": false,
    "folders": {
      "show it or not": {
        "preset": "Default",
        "closed": true,
        "folders": {}
      }
    }
  }
  var gui = new dat.GUI({
    load: JSON,
    preset: 'Default'
  });
  gui.remember(setting);
  gui.add(setting, 'selected', {
    "None": 0,
    "Kindey Artery": 1,
    "Kindey Vein": 2,
    "Kindey(left)": 3,
    "Kindey(right)": 4,
    "Tumor": 5,
  }).name('Selected')
    .onFinishChange(function () {
      setting[obj_list[parseInt(setting['selected']) - 1].name] = true
      UpdateDisplay()
    })
  var f2 = gui.addFolder('show it or not');
  for (i in obj_list) {
    f2.add(setting, obj_list[i].name).name(obj_list[i].name).onFinishChange(function () {
      UpdateDisplay()
    });
  }

  $("#canvas-container").append(gui.domElement);
  $(gui.domElement).attr("style", "position:absolute; top:0; right:0");

  //CAMERA
  // --------------------------------------------
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.rotateSpeed = 0.2;
  controls.maxDistance = 15;
  controls.minDistance = 5;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  window.addEventListener('resize', onWindowResize, false);
}

//EVENT
// --------------------------------------------
$("canvas").mousedown(function (e) {
  e.preventDefault();
  mouse.x = (e.offsetX / canvasParent.width()) * 2 - 1;
  mouse.y = -(e.offsetY / canvasParent.height()) * 2 + 1;
  raycastSegment(e);
});
$("canvas").on("tap", function (e) {
  e.preventDefault();
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  console.log(e.which);
  raycastSegment(e);
});


//RAYCAST
// --------------------------------------------
function raycastSegment(e) {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(intersectObj);
  if (intersects.length > 0) {
    for (i in obj_list) {
      if (obj_list[i].obj == intersects[0].object) {
        console.log(obj_list[i].name + " is being hit")
        switch (e.which) {
          case 1:
            setting['selected'] = parseInt(i) + 1
            break;
          case 3:
            setting[obj_list[i].name] = false
            break;
        }

      }
    }
  }
  UpdateDisplay();
}

//RENDER
// --------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
  stats.update();
  TWEEN.update();
}

//改变窗口尺寸
function onWindowResize() {
  camera.aspect = canvasParent.width() / canvasParent.height();
  camera.updateProjectionMatrix();
  renderer.setSize(canvasParent.width(), canvasParent.height());
}