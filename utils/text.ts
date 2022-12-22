import React from 'react'
import { chakra, Heading } from '@chakra-ui/react'
import opentype from 'opentype.js'
import * as makerjs from 'makerjs'
import * as markerjs2 from 'markerjs2'
// const stlSerializer = require('@jscad/stl-serializer');

export class Text {
    // public fontList!: any;
    // private fileUpload!: HTMLInputElement;
    // private fileUploadRemove!: HTMLInputElement;
    private customFont!: opentype.Font
    // private selectFamily!: HTMLSelectElement;
    // private selectVariant!: HTMLSelectElement;
    // private unionCheckbox!: HTMLInputElement;
    // private filledCheckbox!: HTMLInputElement;
    // private kerningCheckbox!: HTMLInputElement;
    // private separateCheckbox!: HTMLInputElement;
    // private textInput!: HTMLInputElement;
    // private bezierAccuracy!: HTMLInputElement;
    // private selectUnits!: HTMLSelectElement;
    // private sizeInput!: HTMLInputElement;
    private renderDiv!: HTMLDivElement
    // private outputTextarea!: HTMLTextAreaElement;
    // private copyToClipboardBtn!: HTMLButtonElement;
    // private downloadButton!: HTMLAnchorElement;
    // private dxfButton!: HTMLAnchorElement;
    // private createLinkButton!: HTMLAnchorElement;
    // private dummy!: HTMLInputElement;
    // private fillInput!: HTMLInputElement;
    // private strokeInput!: HTMLInputElement;
    // private strokeWidthInput!: HTMLInputElement;

    // private renderCurrent = () => {
    //     var size = this.sizeInput.valueAsNumber;
    //     if (!size) size = parseFloat(this.sizeInput.value);
    //     if (!size) size = 100;
    //     this.render(
    //         this.selectFamily.selectedIndex,
    //         this.selectVariant.selectedIndex,
    //         this.textInput.value,
    //         size,
    //         this.unionCheckbox.checked,
    //         this.filledCheckbox.checked,
    //         this.kerningCheckbox.checked,
    //         this.separateCheckbox.checked,
    //         parseFloat(this.bezierAccuracy.value) || undefined,
    //         this.selectUnits.value,
    //         this.fillInput.value,
    //         this.strokeInput.value,
    //         this.strokeWidthInput.value,
    //     );
    // };

    // private load = () => {
    //     var reader = new FileReader();
    //     var font = reader.readAsArrayBuffer(fredokaOne)
    //     this.customFont = opentype.parse(font)
    // };
    // private updateUrl = () => {
    //     var urlSearchParams = new URLSearchParams(window.location.search);

    //     urlSearchParams.set('font-select', this.selectFamily.value);
    //     urlSearchParams.set('font-variant', this.selectVariant.value);
    //     urlSearchParams.set('input-union', String(this.unionCheckbox.checked));
    //     urlSearchParams.set('input-filled', String(this.filledCheckbox.checked));
    //     urlSearchParams.set('input-kerning', String(this.kerningCheckbox.checked));
    //     urlSearchParams.set('input-separate', String(this.separateCheckbox.checked));
    //     urlSearchParams.set('input-text', this.textInput.value);
    //     urlSearchParams.set('input-bezier-accuracy', this.bezierAccuracy.value);
    //     urlSearchParams.set('dxf-units', this.selectUnits.value);
    //     urlSearchParams.set('input-size', this.sizeInput.value);
    //     urlSearchParams.set('input-fill', this.fillInput.value);
    //     urlSearchParams.set('input-stroke', this.strokeInput.value);
    //     urlSearchParams.set('input-strokeWidth', this.strokeWidthInput.value);

    //     const url = window.location.protocol
    //         + "//" + window.location.host
    //         + window.location.pathname
    //         + "?"
    //         + urlSearchParams.toString();

    //     window.history.replaceState({ path: url }, "", url)

    //     this.copyString(window.location.href)
    //     this.createLinkButton.innerText = 'copied';
    //     setTimeout(() => {
    //         this.createLinkButton.innerText = 'create link';
    //     }, 2000)
    // }
    // private copyString = (string: string) => {
    //     this.dummy.value = string;
    //     this.dummy.type = 'text';
    //     this.dummy.select();
    //     document.execCommand('copy');
    //     this.dummy.type = 'hidden';
    // }
    // private readUploadedFile = async (event: Event) => {
    //     const element = event.currentTarget as HTMLInputElement;

    //     if (element.files.length === 0) {
    //         this.customFont = undefined;
    //     } else {
    //         var files = element.files[0];

    //         var buffer = await files.arrayBuffer();

    //         var font = opentype.parse(buffer);

    //         this.customFont = font;
    //     }
    //     this.renderCurrent();
    // }
    // private removeUploadedFont = () => {
    //     this.fileUpload.value = null;
    //     this.customFont = undefined;
    //     this.renderCurrent();
    // }

    constructor() {}

    init() {
        this.renderDiv = this.$('#svg-render') as HTMLDivElement

        // this.load()

        // Init units select.
        // Object.values(makerjs.unitType).forEach(unit => this.addOption(this.selectUnits, unit));
    }

    // readQueryParams() {
    //     var urlSearchParams = new URLSearchParams(window.location.search);

    //     var selectFamily = urlSearchParams.get('font-select');
    //     var selectVariant = urlSearchParams.get('font-variant');
    //     var unionCheckbox = urlSearchParams.get('input-union');
    //     var filledCheckbox = urlSearchParams.get('input-filled');
    //     var kerningCheckbox = urlSearchParams.get('input-kerning');
    //     var separateCheckbox = urlSearchParams.get('input-separate');
    //     var textInput = urlSearchParams.get('input-text');
    //     var bezierAccuracy = urlSearchParams.get('input-bezier-accuracy');
    //     var selectUnits = urlSearchParams.get('dxf-units');
    //     var sizeInput = urlSearchParams.get('input-size');
    //     var fillInput = urlSearchParams.get('input-fill');
    //     var strokeInput = urlSearchParams.get('input-stroke');
    //     var strokeWidthInput = urlSearchParams.get('input-stroke-width');

    //     if (selectFamily !== "" && selectFamily !== null)
    //         this.selectFamily.value = selectFamily;

    //     if (selectVariant !== "" && selectVariant !== null)
    //         this.selectVariant.value = selectVariant;

    //     if (selectUnits !== "" && selectUnits !== null)
    //         this.selectUnits.value = selectUnits;

    //     if (unionCheckbox !== "" && unionCheckbox !== null)
    //         this.unionCheckbox.checked = unionCheckbox === "true" ? true : false;

    //     if (filledCheckbox !== "" && filledCheckbox !== null)
    //         this.filledCheckbox.checked = filledCheckbox === "true" ? true : false;

    //     if (kerningCheckbox !== "" && kerningCheckbox !== null)
    //         this.kerningCheckbox.checked = kerningCheckbox === "true" ? true : false;

    //     if (separateCheckbox !== "" && separateCheckbox !== null)
    //         this.separateCheckbox.checked = separateCheckbox === "true" ? true : false;

    //     if (textInput !== "" && textInput !== null)
    //         this.textInput.value = textInput;

    //     if (bezierAccuracy !== "" && bezierAccuracy !== null)
    //         this.bezierAccuracy.value = bezierAccuracy;

    //     if (sizeInput !== "" && sizeInput !== null)
    //         this.sizeInput.value = sizeInput;

    //     if (fillInput !== "" && fillInput !== null)
    //         this.fillInput.value = fillInput;

    //     if (strokeInput !== "" && strokeInput !== null)
    //         this.strokeInput.value = strokeInput;

    //     if (strokeWidthInput !== "" && strokeWidthInput !== null)
    //         this.strokeWidthInput.value = strokeWidthInput;

    // }

    // handleEvents() {
    //     this.fileUpload.onchange = this.readUploadedFile;
    //     this.fileUploadRemove.onclick = this.removeUploadedFont
    //     this.selectFamily.onchange = this.loadVariants;
    //     this.selectVariant.onchange =
    //         this.textInput.onchange =
    //         this.textInput.onkeyup =
    //         this.sizeInput.onkeyup =
    //         this.unionCheckbox.onchange =
    //         this.filledCheckbox.onchange =
    //         this.kerningCheckbox.onchange =
    //         this.separateCheckbox.onchange =
    //         this.bezierAccuracy.onchange =
    //         this.bezierAccuracy.onkeyup =
    //         this.selectUnits.onchange =
    //         this.fillInput.onchange =
    //         this.fillInput.onkeyup =
    //         this.strokeInput.onchange =
    //         this.strokeInput.onkeyup =
    //         this.strokeWidthInput.onchange =
    //         this.strokeWidthInput.onkeyup =
    //         this.renderCurrent
    //         ;

    //     // Is triggered on the document whenever a new color is picked
    //     document.addEventListener("coloris:pick", debounce(this.renderCurrent))

    //     this.copyToClipboardBtn.onclick = this.copyToClipboard;
    //     this.downloadButton.onclick = this.downloadSvg;
    //     this.dxfButton.onclick = this.downloadDxf;
    //     this.createLinkButton.onclick = this.updateUrl;
    // }

    $(selector: string) {
        return document.querySelector(selector)
    }

    // addOption(select: HTMLSelectElement, optionText: string) {
    //     var option = document.createElement('option');
    //     option.text = optionText;
    //     option.value = optionText;
    //     select.options.add(option);
    // }

    // getGoogleFonts(apiKey: string) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
    //     xhr.onloadend = () => {
    //         this.fontList = JSON.parse(xhr.responseText);
    //         this.fontList.items.forEach(font => this.addOption(this.selectFamily, font.family));
    //         this.loadVariants();

    //         this.handleEvents();

    //         this.readQueryParams();
    //         this.renderCurrent();
    //     };
    //     xhr.send();
    // }

    callMakerjs(
        font: opentype.Font,
        text: string,
        size: number,
        union: boolean,
        filled: boolean,
        kerning: boolean,
        separate: boolean,
        units: string,
        fill: string,
        stroke: string,
        strokeWidth: string,
        bezierAccuracy?: number
    ) {
        //generate the text using a font
        var textModel = new makerjs.models.Text(
            font,
            text,
            size,
            union,
            false,
            bezierAccuracy,
            { kerning }
        )

        if (separate) {
            for (var i in textModel.models) {
                textModel.models[i].layer = i
            }
        }

        var svg = makerjs.exporter.toSVG(textModel, {
            fill: filled ? fill : undefined,
            stroke: stroke ? stroke : undefined,
            strokeWidth: strokeWidth ? strokeWidth : undefined,
        })

        this.renderDiv.innerHTML = svg
        // this.renderDiv.id = 'text-svg'
    }

    render(
        text: string,
        size: number,
        union: boolean,
        filled: boolean,
        kerning: boolean,
        separate: boolean,
        units: string,
        fill: string,
        stroke: string,
        strokeWidth: string,
        bezierAccuracy?: number
    ) {
        opentype.load(
            `//fonts.gstatic.com/s/fredokaone/v13/k3kUo8kEI-tA1RRcTZGmTmHBA6aF8Bf_.ttf`,
            (err: string, font: any) => {
                this.callMakerjs(
                    font,
                    text,
                    size,
                    union,
                    filled,
                    kerning,
                    separate,
                    units,
                    fill,
                    stroke,
                    strokeWidth,
                    bezierAccuracy
                )
            }
        )
    }
}
