class SliderPlagin {
    constructor(selector, options) {
        const defatulOptions = {
            min: 50,
            max: 100000,
            values: 500,
            step: 100,
            spaceBetweenNumbers: true
        }
        this.options = Object.assign(defatulOptions, options); // Object.assign - копіює значенняз наданих обєктів в один обєкт
        this.$selector = (selector.tagName == "DIV") ? selector : document.querySelector(selector); // check if the selector is a div or class/id name
        this.#getSelector();
        this.#positionSlider();
        this.#eventSliderSingle();
    }
    #getSelector() {
        const sliderHTML = (Array.isArray(this.options.values)) ? `<div class='slider-circle slider-min'></div><div class='slider-circle slider-max'></div>` : `<div class='slider-circle slider-single'></div>`;
        this.$selector.insertAdjacentHTML("afterbegin", `<div class="slider-block">${sliderHTML} <div class='progress-slider'></div> </div>`);
    }
    #positionSlider() {
        let basisPosition;
        if (Array.isArray(this.options.values) == true) {
            const get_values_array = (varibels) => 100 * (varibels / (this.options.max - this.options.min));
            basisPosition = [get_values_array(this.options.values[0]), get_values_array(this.options.values[1])];
            this.$selector.querySelector('.slider-min').style.left = `${basisPosition[0]}%`;
            this.$selector.querySelector('.slider-max').style.left = `${basisPosition[1]}%`;
            this.$selector.querySelector('.progress-slider').style.cssText = `left: ${get_values_array(this.options.values[0])}%; width: ${100 - get_values_array(this.options.values[0]) - (100 - get_values_array(this.options.values[1]))}%`
        } else {
            basisPosition = 100 * (this.options.values / (this.options.max - this.options.min));
            this.$selector.querySelector('.slider-single').style.left = `${basisPosition}%`;
            this.$selector.querySelector('.progress-slider').style.width = `${100 - basisPosition}%`;
        }
    }
    #eventSliderSingle() {
        const generalEfent = (down, move, up) => {
            this.$selector.querySelector('.slider-circle').addEventListener(down, (event) => {
                this.refMove = (eventMouse) => {
                    this.positionEventSingle.call(this, this, event, eventMouse); // event move slider
                    this.outputSingle.call(this, this, event); // event add value in input
                }
                this.refStop = () => {
                    document.querySelector('body').removeEventListener(move, this.refMove);
                    document.querySelector('body').removeEventListener(up, this.refStop);
                }
                // move mouse
                document.querySelector('body').addEventListener(move, this.refMove);
                document.querySelector('body').addEventListener(up, this.refStop);
            });
        }
        generalEfent('mousedown', 'mousemove', 'mouseup');
        generalEfent('touchstart', 'touchmove', 'touchend');
    }
    positionEventSingle(th, event, eventMouse) {
        const mouse_position = eventMouse.pageX;
        const position_div = event.target.closest(`.${th.$selector.className}`).getBoundingClientRect().left;
        const width_div = event.target.closest(`.${th.$selector.className}`).offsetWidth;
        const circlePosition = (mouse_position - position_div) / width_div * 100;
        let res = circlePosition
        if (circlePosition >= 100) { res = 100 } else if (circlePosition <= 0) res = 0;
        event.target.style.left = `${res}%`
        event.target.closest(`.${th.$selector.className}`).querySelector('.progress-slider').style.width = `${100 - res}%`;
    }
    outputSingle(th) {
        const getPercent = parseFloat(th.$selector.querySelector('.slider-circle').style.left) / 100;
        const getDiapasone = th.options.max - th.options.min;
        let resultDiapasone = Math.round((th.options.min + getDiapasone * getPercent) / th.options.step) * th.options.step;
        (th.options.spaceBetweenNumbers == true) && (resultDiapasone = resultDiapasone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        th.$selector.closest(`.${th.$selector.className}`).querySelector('input').value = resultDiapasone
    }








}







document.querySelectorAll('.sliderPlagin').forEach((el) => {
    const plagin = new SliderPlagin(el, {

    });





});


