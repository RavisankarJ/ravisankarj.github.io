import * as THREE from "https://esm.sh/three@0.152.0";

const organData = {
    "Mouth": "The beginning of the digestive tract. Salivary glands in the mouth release salivary amylase, which breaks down carbohydrates into simple sugar.",
    "Oesophagus": "A muscular tube connecting the throat with the stomach. It uses peristalsis (muscular contractions) to push food down.",
    "Stomach": "A hollow organ that holds food while it is being mixed with stomach enzymes (pepsin) and hydrochloric acids. Pepsin breaks down proteins into smaller units. The acidic environment also kills harmful bacteria. Mucus protects the stomach lining from the acidic environment.",
    "Liver": "The liver produce bile which helps in the emulsification of fats and makes alkaline environment for the proper functioning of enzymes in the small intestine.",
    "Gallbladder": "Stores bile from the liver, and then releases it into the small intestine to help absorb and digest fats.",
    "Pancreas": "Secretes digestive enzymes (pancreatic juice) into the small intestine that break down protein (by trypsin), fats (by lipase).",
    "Small Intestine": "The small intestine is a 22-foot long muscular tube that breaks down food using enzymes released by the pancreas and bile from the liver. It also secretes intestinal juice which helps in the digestion of carbohydrates, proteins, and fats into glucose, amino acids, fatty acids, and glycerol.",
    "Large Intestine": "Responsible for processing undigested food. It absorbs water and fibers from the remaining indigestible food matter and then passes useless waste material from the body.",
    "Anus": "The final part of the digestive tract. It consists of the pelvic floor muscles and two anal sphincters (internal and external). Its primary function is to control the expulsion of feces (waste) from the body, signaling the end of the digestion and excretion process."
};

let markers = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const popup = document.getElementById("infoPopup");
const popupTitle = document.getElementById("popupTitle");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.getElementById("closePopup");

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
}

export function initMarkers(model, camera, renderer, onMarkerClick) {
    const markerGroup = new THREE.Group();
    markerGroup.name = "OrganMarkers";
    model.add(markerGroup);

    // ... (rest of texture creation kept) ...
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(230, 126, 34, 0.8)');
    gradient.addColorStop(1, 'rgba(230, 126, 34, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    model.traverse((child) => {
        if (child.name.startsWith("Label_")) {
            let organName = child.name.replace("Label_", "").replace(/_/g, " ");

            // AUTOMATIC TYPO CORRECTION (Workaround for Blender naming)
            const nameMapping = {
                "Small Instestine": "Small Intestine",
                "Large Instine": "Large Intestine",
                "GallBlader": "Gallbladder",
                "Rectum": "Anus" // Syncing Rectum to Anus if needed
            };

            if (nameMapping[organName]) {
                organName = nameMapping[organName];
            }

            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
            const sprite = new THREE.Sprite(spriteMaterial);
            const worldPos = new THREE.Vector3();
            child.getWorldPosition(worldPos);
            model.worldToLocal(worldPos);
            sprite.position.copy(worldPos);
            sprite.scale.set(4, 4, 1);
            sprite.userData = { isMarker: true, name: organName, description: organData[organName] };
            markerGroup.add(sprite);
            markers.push(sprite);
            child.visible = false;
        }
    });

    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(markers);

        if (intersects.length > 0) {
            const marker = intersects[0].object;

            // Notify quiz system. It will return true if it 'handled' the click (i.e. quiz is active)
            const wasHandledByQuiz = onMarkerClick ? onMarkerClick(marker.userData.name) : false;

            // Only show popup if NOT handled by quiz and markers are toggled ON
            if (!wasHandledByQuiz && marker.visible && marker.parent && marker.parent.visible) {
                showPopup(marker.userData.name, marker.userData.description);
            }
        }
    });

    // Function to force show/hide markers (for quiz)
    const setMarkersVisible = (visible) => {
        markerGroup.visible = visible;
    };

    const animateMarkers = function (time) {
        markers.forEach((marker, i) => {
            const pulse = 1 + Math.sin(time * 3 + i) * 0.2;
            marker.scale.set(4 * pulse, 4 * pulse, 1);
        });
    };

    return { animateMarkers, markerGroup, setMarkersVisible };
}

function showPopup(title, content) {
    if (!popup) return;
    popupTitle.textContent = title;
    popupContent.textContent = content;
    popup.classList.remove("hidden");
}
