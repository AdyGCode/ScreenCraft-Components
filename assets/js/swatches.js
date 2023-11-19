function updateNumbersOfColours(base = 22, count = 0) {
    const colourCount = document.getElementById('additionalColours')
    const baseCount = document.getElementById('baseColours')
    colourCount.innerText = `{count-base} Custom colours.`
    baseCount.innerText = `{base} Base colours.`
}

function generateSwatches(colours) {
    const swatchesContainer = document.getElementById('swatches')

    swatchesContainer.innerHTML = ''

    if (typeof colours !== "array") {
        for (const colourName in colours) {
            const colourShades = colours[colourName]
            let swatchSection = document.createElement('section')
            swatchSection.classList.add("flex")
            swatchSection.classList.add("flex-col")
            swatchSection.classList.add("w-full")
            swatchSection.classList.add("m-4")
            swatchSection.classList.add("p-0")
            swatchSection.classList.add("border")
            swatchSection.classList.add("border-gray-500")
            swatchSection.classList.add("shadow")
            let heading = document.createElement('h3')
            heading.textContent = colourName;
            heading.classList.add('w-full')
            heading.classList.add('bg-black')
            heading.classList.add('text-white')
            heading.classList.add('text-center')
            heading.classList.add('font-bold')
            heading.classList.add('p-2')
            heading.classList.add('-mx-2')
            heading.classList.add('mb-6')
            swatchSection.appendChild(heading)

            for (const shade in colourShades) {
                let paragraph = document.createElement('div')
                paragraph.classList.add("w-full")
                paragraph.classList.add("grid")
                paragraph.classList.add("grid-cols-3")
                paragraph.classList.add("px-2")
                paragraph.classList.add("py-1")
                paragraph.innerHTML = `<p class="col-span-1">${shade}</p>
                                   <p class="col-span-2 px-2" style="background:${colourShades[shade]}">${colourShades[shade]}</p>`

                swatchSection.appendChild(paragraph)
        }

            swatchesContainer.appendChild(swatchSection)
    }
    }
}

function readAndUpdateColours() {
    fetch('../colours/colours.json')
        .then(response => response.json())
        .then(data => {
            const storedColours = JSON.parse(localStorage.getItem('colours'))
            const storedColourCount = JSON.parse(localStorage.getItem('colourCount'))

            if (storedColours !== colours) {
                localStorage.setItem('colours', JSON.stringify(colours))
            }
            generateSwatches(colours);

            const colours = data.colours;
            const colourCount = data.colours.length;

            if (storedColourCount !== colourCount) {
                localStorage.setItem('colourCount', JSON.stringify(colourCount))
            }
            updateNumbersOfColours(colourCount);

        })
        .catch(error => {
            console.error('Error reading the colour data file:', error)
        })
}


readAndUpdateColours()
