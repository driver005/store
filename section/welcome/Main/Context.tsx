import { createContext, useContext, useState } from 'react'

export const CustomizerContext = createContext({})

export default function CustomizerState(props: any) {
    const backplateUnitPrice = 3
    const size = 30
    const backplatePrice = size * backplateUnitPrice
    const initialTextItem = {
        text: 'Hello',
        font: 'Raleway',
        size,
        color: '#000',
        backplate: 'cut-sharp',
        uvPrint: false,
        neonPrice: 0,
        backplatePrice,
        totalPrice: 0,
    }
    const [settings, setSettings] = useState({
        textItems: [initialTextItem],
    })

    const addTextItem = () => {
        textToSvg('Hello')
        const newItems = [...settings.textItems, initialTextItem]
        setSettings((prevState) => ({ ...prevState, textItems: newItems }))
    }

    function textToSvg(text: string) {
        const svgString = `<svg viewbox="387 390 74 20"> <g> <path class="st37" d="M452,408h-56c-4.42,0-8-3.58-8-8l0,0c0-4.42,3.58-8,8-8h56c4.42,0,8,3.58,8,8l0,0 C460,404.42,456.42,408,452,408z" /> </g></svg>`
        const parser = new DOMParser()
        const parsedDoc = parser.parseFromString(svgString, 'image/svg+xml')
        const parsedSvg: any = parsedDoc.querySelector('svg')
        const svgPath = parsedSvg.querySelector('path')
        console.log(parsedDoc)
        console.log(parsedSvg)
        console.log(svgPath)

        let bbox = svgPath.getBBox()
        let x = bbox.x + bbox.width / 2
        let y = bbox.y + bbox.height / 2

        // Create a <text> element
        let textElem = document.createElementNS(svgPath.namespaceURI, 'text')
        textElem.setAttribute('x', x)
        textElem.setAttribute('y', y)
        // Centre text horizontally at x,y
        textElem.setAttribute('text-anchor', 'middle')
        // Give it a class that will determine the text size, colour, etc
        textElem.classList.add('label-text')
        // Set the text
        textElem.textContent = text
        // Add this text element directly after the label background path
        svgPath.after(textElem)
        console.log(svgPath)
    }

    return (
        <CustomizerContext.Provider value={{ settings, addTextItem }}>
            {props.children}
        </CustomizerContext.Provider>
    )
}

export function useCustomizer() {
    return useContext(CustomizerContext)
}
