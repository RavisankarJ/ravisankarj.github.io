export const foodData = {
    apple: {
        name: "Apple",
        water: 0.855,
        carbs: 0.115,
        fiber: 0.025,
        protein: 0.003,
        fats: 0.002
    },
    banana: {
        name: "Banana",
        water: 0.750,
        carbs: 0.200,
        fiber: 0.026,
        protein: 0.011,
        fats: 0.003
    },
    briyani: {
        name: "Biryani",
        water: 0.600,
        carbs: 0.210,
        fiber: 0.015,
        protein: 0.090,
        fats: 0.075
    },
    fish: {
        name: "Fish (Lean)",
        water: 0.760,
        carbs: 0.0,
        fiber: 0.0,
        protein: 0.205,
        fats: 0.020
    },
    chips: {
        name: "Chips",
        water: 0.020,
        carbs: 0.500,
        fiber: 0.035,
        protein: 0.060,
        fats: 0.350
    }
};

export const digestionStagesData = {
    carbs: {
        name: "Carbohydrates",
        mouth: 0.30,
        stomach: 0.0,
        smallIntestine: 0.60,
        largeIntestine: 0.10
    },
    protein: {
        name: "Proteins",
        mouth: 0.05,
        stomach: 0.40,
        smallIntestine: 0.55,
        largeIntestine: 0.0
    },
    fats: {
        name: "Fats",
        mouth: 0.05,
        stomach: 0.10,
        smallIntestine: 0.85,
        largeIntestine: 0.0
    },
    fiber: {
        name: "Fiber",
        mouth: 0.05,
        stomach: 0.0,
        smallIntestine: 0.0,
        largeIntestine: 0.95
    },
    vitamins: {
        name: "Vitamins/Minerals",
        mouth: 0.0,
        stomach: 0.20,
        smallIntestine: 0.80,
        largeIntestine: 0.0
    },
    water: {
        name: "Water",
        mouth: 0.0,
        stomach: 0.0,
        smallIntestine: 0.10,
        largeIntestine: 0.90
    }
};

/**
 * Helper to format a decimal as a percentage string
 * Example: formatPercent(0.855) -> "85.5%"
 */
export function formatPercent(value) {
    return (value * 100).toFixed(1) + "%";
}

/**
 * Example computation: Calculate how much of a specific nutrient 
 * from a food item is digested in a specific organ.
 */
export function calculateDigestion(foodKey, nutrientKey, organKey) {
    const food = foodData[foodKey];
    const digestion = digestionStagesData[nutrientKey];
    if (food && digestion) {
        const totalNutrient = food[nutrientKey] || 0;
        const organEfficiency = digestion[organKey] || 0;
        return totalNutrient * organEfficiency;
    }
    return 0;
}

export const enzymeData = {
    salivaryAmylase: {
        name: "Salivary Amylase",
        carbWork: 0.30,
        proteinWork: 0.0,
        fatWork: 0.0
    },
    pepsin: {
        name: "Pepsin",
        carbWork: 0.0,
        proteinWork: 0.40,
        fatWork: 0.0
    },
    trypsin: {
        name: "Trypsin",
        carbWork: 0.0,
        proteinWork: 0.50,
        fatWork: 0.0
    },
    bile: {
        name: "Bile Juice/Salts",
        carbWork: 0.0,
        proteinWork: 0.0,
        fatWork: 0.60
    },
    lipase: {
        name: "Lipase",
        carbWork: 0.0,
        proteinWork: 0.0,
        fatWork: 0.40
    },
    intestinalJuice: {
        name: "Intestinal Juice",
        carbWork: 0.70,
        proteinWork: 0.10,
        fatWork: 0.0
    }
};
