function generateSwatches(colors) {
    const swatchesContainer = document.getElementById('swatches')

    swatchesContainer.innerHTML = ''

    if (typeof colors !== "array") {
        for (const colorName in colors) {
            const colorShades = colors[colorName]
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
        heading.textContent = colorName;
            heading.classList.add('w-full')
            heading.classList.add('bg-black')
            heading.classList.add('text-white')
            heading.classList.add('text-center')
            heading.classList.add('font-bold')
            heading.classList.add('p-2')
            heading.classList.add('-mx-2')
            heading.classList.add('mb-6')
            swatchSection.appendChild(heading)

            for (const shade in colorShades) {
                let paragraph = document.createElement('div')
                paragraph.classList.add("w-full")
                paragraph.classList.add("grid")
                paragraph.classList.add("grid-cols-3")
                paragraph.classList.add("px-2")
                paragraph.classList.add("py-1")
                paragraph.innerHTML = `<p class="col-span-1">${shade}</p>
                                   <p class="col-span-2 px-2" style="background:${colorShades[shade]}">${colorShades[shade]}</p>`

                swatchSection.appendChild(paragraph)
        }

            swatchesContainer.appendChild(swatchSection)
    }
    }
}

function readAndUpdateColors() {
    fetch('../colours/colours.json')
        .then(response => response.json())
        .then(data => {
            const storedColours = JSON.parse(localStorage.getItem('colors'))
            const colors = data.colors;
            if (storedColours !== colors) {
                localStorage.setItem('colors', JSON.stringify(colors))
            }
            generateSwatches(colors);
        })
        .catch(error => {
            console.error('Error reading the color data file:', error)
        })
}


readAndUpdateColors()
