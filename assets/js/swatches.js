// Function to generate the color swatches
function generateSwatches(colors) {
    const swatchesContainer = document.getElementById('swatches');

    // Clear the existing content
    swatchesContainer.innerHTML = '';

    // Loop through the color data and create swatches
    for (const colorName in colors) {
        const colorShades = colors[colorName];
        const swatchSection = document.createElement('section');
            swatchSection.classList.add("flex")
            swatchSection.classList.add("flex-row")
            swatchSection.classList.add("flex-wrap")
            // swatchSection.classList.add("max-w-1/3")
            swatchSection.classList.add("m-4")
            swatchSection.classList.add("p-4")
            swatchSection.classList.add("border")
        const heading = document.createElement('h3');
        heading.textContent = colorName;
        heading.classList.add('w-full')
        heading.classList.add('bg-black')
        heading.classList.add('text-white')
        heading.classList.add('p-2')
        heading.classList.add('-m-2')
        heading.classList.add('mb-4')
        swatchSection.appendChild(heading);

        for (const shade in colorShades) {
            const paragraph = document.createElement('div');
            paragraph.classList.add("w-1/4")
            paragraph.classList.add("grid")
            paragraph.classList.add("grid-cols-2")

            paragraph.innerHTML = `<p class="w-1/4">${shade}</p><p class="w-full" style="background:${colorShades[shade]}">${colorShades[shade]}</p>`;
            // paragraph.textContent = `${shade}: ${colorShades[shade]}`;
            swatchSection.appendChild(paragraph);
        }

        swatchesContainer.appendChild(swatchSection);
    }
}

// Function to read and update the color data from colors.json
function readAndUpdateColors() {
    fetch('./colours.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            const colors = data.colors;
            // Store the color data in localStorage
            localStorage.setItem('colors', JSON.stringify(colors));

            // Generate and display the swatches
            generateSwatches(colors);
        })
        .catch(error => {
            console.error('Error reading the color data file:', error);
        });
}

// Check if the colors are already stored in localStorage
const storedColors = localStorage.getItem('colors');

if (storedColors) {
    generateSwatches(JSON.parse(storedColors));
} else {
    // If not, read and update the colors from the JSON file
    readAndUpdateColors();
}
