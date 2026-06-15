# Human Digestive System Simulation

Welcome to the **Interactive 3D Physiology Simulation** of the Human Digestive System. This project allows users to visualize how different foods travel through the digestive tract, how nutrients are absorbed, and what happens when specific organs malfunction.

## 🌟 Key Features

- **Interactive 3D Visualization**: A full 3D model of the human digestive system, allowing you to pan, zoom, and rotate while food moves through the tract.
- **Dynamic Food Simulation**: Choose from various foods (Apple, Banana, Biryani, Fish, Chips) and watch them break down into basic nutrients (Carbs, Protein, Fats, Water, Fiber).
- **Real-Time Nutritional Dashboard**: See live, animated progress bars showing the absorption percentage of each nutrient as the food travels from the mouth to the large intestine.
- **Enzyme & Secretion Tracking**: Observe which enzymes (e.g., salivary amylase, pepsin, bile, lipase) are currently active in the digestion process.
- **Physiology Scenarios (Malfunctions)**: Toggle the health of key digestive organs to see real-world impacts:
  - **Proper Chewing**: Turning this off simulates swallowing chunks whole, leading to stomach overload and reduced digestion efficiency.
  - **Healthy Pancreas**: Turning this off halts pancreatic enzymes, drastically reducing the breakdown of proteins, carbs, and fats.
  - **Healthy Liver**: Turning this off stops bile production, causing fat malabsorption.
- **Interactive Quiz Mode**: Test your knowledge by finding and clicking the correct organs directly on the 3D model.
- **Playback Controls**: Pause, play, scrub through the timeline, and adjust the simulation speed on the fly.

---

## 🎮 How to Use the Simulation

### 1. Starting a Simulation (Food Selection)
1. Open the **Right Side Drawer** by clicking the **FOOD** tab.
2. Select a food item from the grid.
3. The simulation will automatically start, showing the food entering the mouth.

### 2. Monitoring Progress
- **Organ Tooltip**: Look at the right side of the screen. A tooltip will display the current organ the food is inside, along with a visual reference image (or chewing animation!).
- **Dashboard**: Watch the bottom-left Nutritional Dashboard. It updates dynamically, showing nutrient absorption caps and currently active enzymes.

### 3. Using Playback Controls
- At the bottom of the screen, use the **Playback Ribbon** to:
  - **Pause/Play** the simulation using the `||` / `>` button.
  - **Scrub** forward or backward through the digestion timeline using the main slider.
  - **Adjust Speed** using the secondary speed slider to slow down or speed up the animation.

### 4. Exploring Physiology Scenarios (Settings)
1. Open the **SETTINGS** tab in the Right Side Drawer.
2. Toggle the switches under **Physiology Scenarios** (Proper Chewing, Healthy Pancreas, Healthy Liver).
3. Observe the effects:
   - **Visual Alerts**: Warning lights (e.g., yellow for stomach overload, toxic green for intestine acid burn) will appear on the 3D model.
   - **UI Alerts**: A critical malfunction alert box will appear in the top left explaining the biological consequence.
   - **Nutrient Penalties**: The dashboard will cap absorption prematurely, and bars will turn red to indicate wasted, undigested nutrients.

### 5. Taking the Quiz
1. Open the **QUIZ** tab in the Right Side Drawer.
2. Click **Start New Quiz**.
3. A prompt will appear at the top of the screen asking you to locate a specific organ.
4. Click on the 3D model to guess. You can use the "Hint" button if you get stuck!

---

## 🛠️ Technical Overview

This simulation is built entirely using vanilla web technologies and Three.js:
- **HTML/CSS/JS**: Core logic, sleek UI styling, and side-drawer mechanics.
- **Three.js**: Handles the rendering of the 3D meshes, spline path traversal, particle breakdowns, and dynamic lighting.

### Running Locally
To run this project on your local machine:
1. Ensure all files (especially the `assets` folder containing textures and models) are present.
2. Because of CORS (Cross-Origin Resource Sharing) policies when loading 3D models and textures, you **must** serve the files using a local web server rather than just double-clicking the `index.html` file.
   - *If using VS Code*: Install the "Live Server" extension and click "Go Live".
   - *If using Python*: Run `python -m http.server 8000` in the directory and go to `http://localhost:8000` in your browser.
   - *If using Node.js*: Run `npx serve .` in the directory.

Enjoy exploring the human digestive system!
