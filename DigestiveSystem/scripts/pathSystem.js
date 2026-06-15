import * as THREE from "https://esm.sh/three@0.152.0";

export function createPathSystem(digestiveModel) {

    // STEP 2 — define points
    const points = [];

    const track =
        digestiveModel.getObjectByName("DigestiveTrackMesh");

    let trackMesh = null;
    track.traverse((child) => {

        if (child.isMesh || child.isLine) {
            trackMesh = child;
        }
    });
    trackMesh.updateWorldMatrix(true, false);
    digestiveModel.updateWorldMatrix(true, false);

    const positions =
        trackMesh.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        trackMesh.localToWorld(vertex);
        digestiveModel.worldToLocal(vertex);
        points.push(vertex);
    }
    // STEP 3 — curve
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");

    // STEP 4 — visualize path
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(500)
    );

    const pathMaterial = new THREE.LineBasicMaterial({
        color: 0xffff00
    });

    const pathLine = new THREE.Line(pathGeometry, pathMaterial);

    digestiveModel.add(pathLine);

    // FIND KEY POINTS
    const keyPoints = {
        oesophagusStart: "PathPoint_02",
        oesophagusEnd: "PathPoint_07",
        stomachStart: "PathPoint_08",
        stomachEnd: "PathPoint_13"
    };
    const stageTValues = {};

    function findClosestT(curve, point, samples = 1000) {
        let closestT = 0;
        let minDist = Infinity;
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const p = curve.getPoint(t);
            const dist = p.distanceToSquared(point);
            if (dist < minDist) {
                minDist = dist;
                closestT = t;
            }
        }
        return closestT;
    }

    for (const [key, name] of Object.entries(keyPoints)) {
        const obj = digestiveModel.getObjectByName(name);
        if (obj) {
            const pos = new THREE.Vector3();
            obj.updateMatrixWorld(true); // Ensure matrix is current
            obj.getWorldPosition(pos);
            digestiveModel.worldToLocal(pos);
            stageTValues[key] = findClosestT(curve, pos);
            // console.log(`Found ${name} at t = ${stageTValues[key].toFixed(4)}`);
        } else {
            console.warn(`Could not find ${name}`);
            stageTValues[key] = key.includes("Start") ? 0.2 : 0.5; // fallback
        }
    }

    return {
        curve,
        pathLine,
        stageTValues
    };
}
const textureLoader =
    new THREE.TextureLoader();

export function createFoodSprite(foodName) {

    const texture =
        textureLoader.load(
            `/assets/${foodName}1.png`
        );

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });

    const food =
        new THREE.Group();

    const wholeFood =
        new THREE.Sprite(material);

    wholeFood.scale.set(3, 3, 3);
    food.add(wholeFood);
    food.userData.wholeFood = wholeFood;
    food.userData.foodTexture = texture;

    return food;

}

let currentFood = null;
export function setCurrentFood(food) {
    console.log("Setting current food:", food);
    currentFood = food;
}
