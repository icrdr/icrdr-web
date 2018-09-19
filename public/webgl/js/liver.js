var canvasParent = $("#canvas-container");
var renderer, scene, camera;
var stats, gui;
var raycaster, mouse;
var grp;
var selected;
var setting = {
  mode: 0
}
var colors = [
  "#fd6847",
  "#ffc546",
  "#b4d64a",
  "#75e28a",
  "#947dd1",
  "#a1e0f1",
  "#89bfff",
  "#7887e3"
]
var model_dict = {
  "a": {
    mtl: {
      a: "#df5875"
    },
    info: "Hepatic Artery"
  },
  "v": {
    mtl: {
      v: "#71c8e1"
    },
    info: "Hepatic Vein"
  },
  "t": {
    mtl: {
      t: "#ed87ab"
    },
    info: "Tumor"
  },
  "p": {
    mtl: {
      p_0: "#39b9bb",
      p_1: "#fd6847",
      p_2: "#ffc546",
      p_3: "#b4d64a",
      p_4: "#75e28a",
      p_5: "#947dd1",
      p_6: "#a1e0f1",
      p_7: "#89bfff",
      p_8: "#7887e3",
    },
    info: "Portal Vein"
  },
  "h_1": {
    mtl: {
      h_1: "#fd6847"
    },
    info: "HS I"
  },
  "h_2": {
    mtl: {
      h_2: "#ffc546"
    },
    info: "HS II"
  },
  "h_3": {
    mtl: {
      h_3: "#b4d64a"
    },
    info: "HS III"
  },
  "h_4": {
    mtl: {
      h_4: "#75e28a"
    },
    info: "HS IV(a+b)"
  },
  "h_5": {
    mtl: {
      h_5: "#947dd1"
    },
    info: "HS V"
  },
  "h_6": {
    mtl: {
      h_6: "#a1e0f1"
    },
    info: "HS VI"
  },
  "h_7": {
    mtl: {
      h_7: "#89bfff"
    },
    info: "HS VII"
  },
  "h_8": {
    mtl: {
      h_8: "#7887e3"
    },
    info: "HS VIII"
  },
};

for (i = 0; i < colors.length; i++) {
  var j = i + 1
  model_dict["p"].mtl["p_" + j] = colors[i]
  model_dict["h_" + j].mtl["h_" + j] = colors[i]
}
console.log(model_dict)

//读取进度条
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

//显示效果更新
function UpdateDisplay() {
  switch (setting.mode) {
    case 0:
    for (i in grp1.children) {

    }
      grp1.visible = true
      grp2.visible = false
      break;
    case 1:
      grp1.visible = false
      grp2.visible = true
      break;
  }

  if (selected) {
    $("#info-text").html(model_dict[selected.name].info);
    $("#info-text").css('color', model_dict[selected.name].color);
  } else {
    $("#info-text").css('color', '#ed87ab');
    $("#info-text").html("Touch it!");
  }

  if (selected) {
    selected.material.color.setHex(col2Hex(model_dict[selected.name].color))
    for (i in grp1.children) {
      var sub = grp1.children[i]
      if (sub != selected) {
        sub.material.color.setHex(col2Hex('0xf8dde7'))
      }
    }
  } else {
    for (i in grp1.children) {
      var sub = grp1.children[i]
      sub.material.color.setHex(col2Hex(model_dict[sub.name].color))
    }
  }
}

init();
animate();

//主体初始化
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
  var obmloader = new THREE.OBMLoader(manager);
  var mtlLoader = new THREE.MTLLoader(manager);

  manager.onLoad = function () {
    console.log('Loading complete!');
    //model_dict["h_0"].model.material.transparent = true
    //model_dict["h_0"].model.material.opacity = 0.3
    liver.position.set(0.15, -0.1, 0);
    liver.scale.set(0.15, 0.15, 0.15);
    liver.rotation.set(0, 3.14, 0);
    console.log(grp1)
    console.log(grp2)
    console.log(model_dict)
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    current_progress = itemsLoaded / itemsTotal * 100;

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  };

  liver = new THREE.Group();
  grp1 = new THREE.Group();
  grp2 = new THREE.Group();
  liver.add(grp1);
  liver.add(grp2);
  scene.add(liver);

  mtlLoader.setPath('./obj/liver/');
  obmloader.setPath('./obj/liver/');

  mtlLoader.load('p.mtl', function (materials) {
    materials.preload();
    obmloader.setMaterials(materials);
    obmloader.load('p.obm', function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          var materials = child.material;
          for (i in materials) {
            var name = materials[i].name.replace("_mtl", "");
            materials[i] = new THREE.MeshLambertMaterial();
            materials[i].color.setHex(col2Hex(model_dict["p"].mtl[name]));
          }
          grp1.add(child);
        }
      });
    });
  });

  for (key in model_dict) {
    filename = key + '.obm'
    if (key == "p") {
      continue
    }
    obmloader.load(filename, function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshLambertMaterial();
          child.material.color.setHex(col2Hex(model_dict[child.name].mtl[child.name]))
          model_dict[child.name]['model'] = child
          if (child.name.indexOf("h_") > -1) {
            grp2.add(child);
          } else {
            grp1.add(child);
          }
        }
      });
    });
  }


  //STATS
  // --------------------------------------------
  stats = new Stats();
  $("#canvas-container").append(stats.dom);
  $(stats.domElement).attr("style", "position:absolute; top:0; left:0");

  // GUI
  // --------------------------------------------
  gui = new dat.GUI({
    autoPlace: false
  });
  gui.add(setting, 'mode', {
    "MODE A": 0,
    "MODE B": 1,
  })
  .name("mode type")
  .onFinishChange(function(){
    UpdateDisplay()
  })
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
$("canvas").on("click", function (e) {
  e.preventDefault();
  mouse.x = (e.offsetX / canvasParent.width()) * 2 - 1;
  mouse.y = -(e.offsetY / canvasParent.height()) * 2 + 1;
  raycastSegment();
});
$("canvas").on("tap", function (e) {
  e.preventDefault();
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  raycastSegment();
});


//点击选中分段
// --------------------------------------------
function raycastSegment() {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(grp1.children);
  if (intersects.length > 0) {
    selected = intersects[0].object;
  } else {
    selected = null;
  }
  //UpdateDisplay();
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