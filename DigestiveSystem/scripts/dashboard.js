import { foodData, digestionStagesData, enzymeData } from './foodData.js';

const dash = document.getElementById("nutritionalDashboard");
const foodNameEl = document.getElementById("dashFoodName");
const enzymeNameEl = document.getElementById("enzymeName");

const bars = {
    carbs: { bar: document.getElementById("bar-carbs"), val: document.getElementById("val-carbs") },
    protein: { bar: document.getElementById("bar-protein"), val: document.getElementById("val-protein") },
    fats: { bar: document.getElementById("bar-fats"), val: document.getElementById("val-fats") },
    water: { bar: document.getElementById("bar-water"), val: document.getElementById("val-water") },
    fiber: { bar: document.getElementById("bar-fiber"), val: document.getElementById("val-fiber") }
};

const enzymeWorkListEl = document.getElementById("enzymeWorkList");

let currentFoodKey = "apple";

export function setDashboardFood(foodKey) {
    currentFoodKey = foodKey;
    const food = foodData[foodKey];
    if (food) {
        foodNameEl.textContent = food.name;
        
        // Show original composition in labels
        nutrients.forEach(n => {
            const label = bars[n].val.parentElement;
            let orig = label.querySelector(".original-val");
            if (!orig) {
                orig = document.createElement("span");
                orig.className = "original-val";
                label.insertBefore(orig, bars[n].val);
            }
            orig.textContent = `(Total: ${(food[n] * 100).toFixed(1)}%) `;
        });

        dash.classList.remove("hidden");
    }
}

export function hideDashboard() {
    dash.classList.add("hidden");
}

function clamp01(v) { return Math.min(1, Math.max(0, v)); }

const nutrients = ['carbs', 'protein', 'fats', 'water', 'fiber'];

export function updateDashboard(progress, simState = { chewing: true, pancreas: true, liver: true }) {
    const food = foodData[currentFoodKey];
    if (!food) return;

    // Boundary Constants (Synced with animation.js)
    const MOUTH_END = 0.01;
    const STOMACH_START = 0.08;
    const STOMACH_END = 0.12;
    const SI_START = 0.12;
    const SI_END = 0.85;
    const LI_START = 0.85;
    const LI_END = 0.98;

    // Helper to calculate contribution of an organ
    const getContribution = (p, start, end, amount) => {
        if (p < start) return 0;
        if (p > end) return amount;
        return ((p - start) / (end - start)) * amount;
    };

    // Calculate Digestion for each nutrient
    nutrients.forEach(n => {
        const data = digestionStagesData[n];
        if (!data) return;

        // Current Simulation Multipliers
        const mouthMult = simState.chewing ? 1 : 0.1;
        const stomachMult = simState.chewing ? 1 : 0.5; // Chunks harder to digest
        
        let siMult = 1;
        if (n === 'fats') {
            if (!simState.liver) siMult *= 0.05; // Critical failure
            if (!simState.pancreas) siMult *= 0.1;
        } else if (n === 'protein') {
            if (!simState.pancreas) siMult *= 0.05; // Critical failure
        }

        // Final Absorption Cap (The biological reality)
        // If an organ failed earlier, the total can NEVER reach 100%
        const maxMouth = (data.mouth || 0) * mouthMult;
        const maxStomach = (data.stomach || 0) * stomachMult;
        const maxSI = (data.smallIntestine || 0) * siMult;
        const maxLI = (data.largeIntestine || 0); // Fiber/Water fermentation usually stays constant
        
        // Calculate current contribution based on progress
        let currentTotal = 0;
        currentTotal += getContribution(progress, 0, MOUTH_END, data.mouth || 0) * mouthMult;
        currentTotal += getContribution(progress, STOMACH_START, STOMACH_END, data.stomach || 0) * stomachMult;
        currentTotal += getContribution(progress, SI_START, SI_END, data.smallIntestine || 0) * siMult;
        currentTotal += getContribution(progress, LI_START, LI_END, data.largeIntestine || 0);

        // HARD CAP: The actual biological maximum for this scenario
        const theoreticalMax = maxMouth + maxStomach + maxSI + maxLI;
        const finalRatio = Math.min(currentTotal, theoreticalMax);

        // Use Math.floor to prevent rounding up to 100%
        const percentDigested = Math.floor(finalRatio * 100);
        
        if (bars[n]) {
            bars[n].bar.style.width = percentDigested + "%";
            bars[n].val.textContent = percentDigested + "%";
            
            // Visual feedback for Malnutrition / Incomplete Digestion
            if (progress > SI_END && percentDigested < 98) {
                bars[n].bar.style.backgroundColor = "#e74c3c"; // Red highlight for wasted nutrients
                bars[n].bar.style.boxShadow = "0 0 15px rgba(231, 76, 60, 0.6)";
            } else {
                bars[n].bar.style.backgroundColor = "";
                bars[n].bar.style.boxShadow = "";
            }
        }
    });

    // Update Enzyme Work Progress
    const activeEnzymes = [];
    if (progress <= MOUTH_END) {
        if (simState.chewing) activeEnzymes.push({ id: 'salivaryAmylase', p: getContribution(progress, 0, MOUTH_END, 1) });
    } else if (progress >= STOMACH_START && progress <= STOMACH_END) {
        activeEnzymes.push({ id: 'pepsin', p: getContribution(progress, STOMACH_START, STOMACH_END, 1) });
    } else if (progress > SI_START && progress <= SI_END) {
        if (simState.liver) activeEnzymes.push({ id: 'bile', p: getContribution(progress, SI_START, SI_END * 0.4, 1) });
        if (simState.pancreas) {
            activeEnzymes.push({ id: 'trypsin', p: getContribution(progress, SI_START, SI_END * 0.6, 1) });
            activeEnzymes.push({ id: 'lipase', p: getContribution(progress, SI_START, SI_END * 0.8, 1) });
        }
        activeEnzymes.push({ id: 'intestinalJuice', p: getContribution(progress, 0.4, SI_END, 1) });
    } else if (progress > LI_START) {
        activeEnzymes.push({ name: "Bacterial Fermentation", p: getContribution(progress, LI_START, LI_END, 1) });
    }

    // Add Warnings if needed
    if (!simState.chewing && progress < STOMACH_END) activeEnzymes.push({ name: "⚠ POOR CHEWING", p: 1 });
    if (!simState.pancreas && progress > SI_START && progress < SI_END) activeEnzymes.push({ name: "⚠ PANCREAS STALLED", p: 1 });
    if (!simState.liver && progress > SI_START && progress < SI_END) activeEnzymes.push({ name: "⚠ LIVER STALLED", p: 1 });

    updateEnzymeUI(activeEnzymes);
}

function updateEnzymeUI(activeList) {
    // Clear old list if count changed significantly or just update
    enzymeWorkListEl.innerHTML = "";
    
    activeList.forEach(item => {
        const data = enzymeData[item.id] || { name: item.name };
        const percent = Math.round(item.p * 100);
        
        const div = document.createElement("div");
        div.className = "enzyme-work-item";
        div.innerHTML = `
            <div class="enzyme-label">
                <span>${data.name}</span>
                <span>${percent}%</span>
            </div>
            <div class="enzyme-mini-bar">
                <div class="enzyme-mini-fill" style="width: ${percent}%"></div>
            </div>
        `;
        enzymeWorkListEl.appendChild(div);
    });

    const primaryEnzyme = activeList.length > 0 ? (enzymeData[activeList[0].id]?.name || activeList[0].name) : "None";
    enzymeNameEl.textContent = primaryEnzyme;
}
