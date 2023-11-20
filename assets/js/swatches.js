const baseColourCount = 22

function getContrastYIQ(hexValue = "000000") {
    const hexColour = hexValue.substring(0, 1) === "#" ? hexValue.substring(1,) : hexValue
    const rh = hexColour.substring(0, 2)
    const r = parseInt(rh, 16)
    const gh = hexColour.substring(2, 4)
    const g = parseInt(gh, 16)
    const bh = hexColour.substring(4, 6)
    const b = parseInt(bh, 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return (yiq >= 148) ? 'text-black' : 'text-white'
}

function updateNumbersOfColours(base = baseColourCount, count = 0) {
    const colourCount = document.getElementById('additionalColours')
    const baseCount = document.getElementById('baseColours')

    colourCount.innerText = `${count - baseColourCount} Custom colours.`
    baseCount.innerText = `${baseColourCount} Base colours.`
}

function generateSwatches(baseCount = baseColourCount, colours) {
    const swatchesContainer = document.getElementById('swatches')
    swatchesContainer.innerHTML = ''

    let swatchCount = 0

    if (typeof colours !== "array") {
        for (const colourName in colours) {
            const colourShades = colours[colourName]
            swatchCount++

            let swatchSection = document.createElement('section')
            swatchSection.classList.add("flex")
            swatchSection.classList.add("flex-col")
            swatchSection.classList.add("w-full")
            swatchSection.classList.add("pb-4")
            swatchSection.classList.add("border")
            // swatchSection.classList.add(swatchCount > baseColourCount ? 'border-gray-700' : 'border-black')
            swatchSection.classList.add("shadow")

            let heading = document.createElement('h3')
            heading.textContent = colourName;
            heading.classList.add('w-full')
            heading.classList.add(swatchCount > baseColourCount ? 'bg-gray-600' : 'bg-black')
            heading.classList.add('text-white')
            heading.classList.add('text-center')
            heading.classList.add('font-bold')
            heading.classList.add('p-2')
            heading.classList.add('my-8')
            heading.classList.add('mb-4')
            heading.classList.add('-mx-6')
            swatchSection.appendChild(heading)


            for (const shade in colourShades) {
                const textColour = getContrastYIQ(colourShades[shade])
                let paragraph = document.createElement('div')
                paragraph.classList.add("w-full")
                paragraph.classList.add("grid")
                paragraph.classList.add("grid-cols-5")
                paragraph.classList.add("px-4")
                paragraph.classList.add("py-1")
                paragraph.innerHTML = `<p class="col-span-3 md:col-span-2 ">${shade} </p>
                                   <p class="col-span-2 md:col-span-3 px-2 ${textColour}" 
                                      style="background:${colourShades[shade]}">${colourShades[shade]}</p>`

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
            if (localStorage.getItem("colours") == null) {
                localStorage.setItem('colours', JSON.stringify([]))
            }
            if (localStorage.getItem("colourCount") == null) {
                localStorage.setItem('colourCount', JSON.stringify(0))
            }

            const storedColours = JSON.parse(localStorage.getItem('colours'))
            const storedColourCount = JSON.parse(localStorage.getItem('colourCount'))

            const colours = data.colors;  // arg American spelling in TailwindCSS
            const colourCount = Object.keys(data.colors).length;  // arg American spelling in TailwindCSS

            if (storedColours !== colours) {
                localStorage.setItem('colours', JSON.stringify(colours))
            }
            generateSwatches(baseColourCount, colours);

            if (storedColourCount !== colourCount) {
                localStorage.setItem('colourCount', JSON.stringify(colourCount))
            }
            updateNumbersOfColours(baseColourCount, colourCount);

        })
        .catch(error => {
            console.error('Error reading the colour data file:', error)
        })
}


readAndUpdateColours()
