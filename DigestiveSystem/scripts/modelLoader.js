import * as THREE from "https://esm.sh/three@0.152.0";
import { GLTFLoader } from "https://esm.sh/three@0.152.0/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export function loadDigestiveSystem(scene) {

  return new Promise((resolve, reject) => {

    loader.load(

      // "models/digestive-system.glb",
      "models/digestivie_path_mesh1.glb",

      (gltf) => {

        const model = gltf.scene;

        model.position.set(0, -50, 0);

        model.scale.set(1.2, 1.2, 1.2);

        scene.add(model);

        // 🔥 MAKE DIGESTIVE SYSTEM TRANSPARENT
       model.traverse((child) => {

    if (child.isMesh) {

        if (
            child.name.includes("Digestive")
        ) {

            child.material.transparent = true;

            child.material.opacity = 0.35;

            child.material.depthWrite = false;
            
            child.material.side = THREE.DoubleSide;

        }

    }

});

        const digest = () => {
          // model.rotation.y += 0.002;
        };

        resolve({ model, digest });

      },

      undefined,

      (error) => reject(error)

    );

  });

}