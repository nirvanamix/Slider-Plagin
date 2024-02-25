class SliderPlugin {
    constructor(selector, options) {
        const defatulOptions = {
            min:1,
            max: 10,
			values: 5, // number or array simpe: [5, 10]
            step: 0.01,
			charactersAfterDot: 2, // toFixed
        }
        this.options = Object.assign(defatulOptions, options);
        this.$selector = (selector.tagName !== undefined) ? selector : document.querySelector(selector); // check selector is a teg, or simple name class or, id;
        this.#renderInSelector(); // render html
		this.#startingInfo(); // basic layout
		this.#eventMousemove(); // event mousemove	
	}
	static getInstance(selector, options) { // patern "Singleton"
		if (!this.instance) {
			this.instance = new SliderPlugin(selector, options);
		}
		return this.instance;
	}
    #renderInSelector(){
		const sliderHTML = (Array.isArray(this.options.values) == true) ? `<div class='slider-circle slider-min'></div><div class='slider-circle slider-max'></div>` : `<div class='slider-circle slider-single'></div>`;
		this.$selector.insertAdjacentHTML('afterbegin', `<div class="slider-block">${sliderHTML}<div class='wr-progress-slider'><div class='progress-slider'></div></div></div>`);
    }
	#startingInfo(){
		this.#recordInInput.call(this, this.options.values); // record information in input
		this.#positionSlider.call(this, this.options.values); // position slider
	}
	#recordInInput(values){
		if (Array.isArray(this.options.values) == true){
			if (this.$selector.querySelectorAll('input')[1] == undefined){
				this.#errorMassage(`!!!Not found input, please add two input in inner ${ this.$selector }. Simple: <label class="${ this.$selector }"><input type="text"><input type="text"></label>`);
				return false
			}
			this.$selector.querySelectorAll('input')[0].value = values[0].toFixed(this.options.charactersAfterDot);
				this.$selector.querySelectorAll('input')[0].setAttribute('value', values[0].toFixed(this.options.charactersAfterDot) );
			this.$selector.querySelectorAll('input')[1].value = values[1].toFixed(this.options.charactersAfterDot);
				this.$selector.querySelectorAll('input')[1].setAttribute('value', values[1].toFixed(this.options.charactersAfterDot) );
		} else{
			if (this.$selector.querySelectorAll('input')[0] == undefined) {
				this.#errorMassage(`!!!Not found input, please add two input in inner ${this.$selector}. Simple: <label class="${this.$selector}"><input type="text"></label>`);
				return false
			}
			this.$selector.querySelectorAll('input')[0].value = values.toFixed(this.options.charactersAfterDot);
			this.$selector.querySelectorAll('input')[0].setAttribute('value', values.toFixed(this.options.charactersAfterDot));
		}
	}
	#positionSlider(values){
		const min = this.options.min;
		const max = this.options.max;
		const value = values;
		const position_single = (value - min)  / (max - min) * 100;
		const position_dual = [(value[0] - min) / (max - min) * 100, (value[1] - min) / (max - min) * 100 ];
		if (Array.isArray(this.options.values) == true) {
			this.$selector.querySelectorAll('.slider-circle').forEach((e, i) => {
				e.style.left = `${position_dual[i]}%`;
			});
			this.$selector.querySelector('.progress-slider').style.cssText = `left: ${position_dual[0]}%; width: ${position_dual[1] - position_dual[0]}%`
		} else{
			this.$selector.querySelector('.slider-single').style.left = `${position_single}%`;
			this.$selector.querySelector('.progress-slider').style.width = `${100 - position_single}%`;
		}
	}
	#eventMousemove(){
		const functionEventMove = (down, move, up) => {
			this.$selector.querySelectorAll('.slider-circle').forEach((el, ind, arr) => {
				el.addEventListener(down, (eventElement) => {
					for (let i = 0; i < arr.length;  i++) (i == ind) ? arr[i].style.zIndex = '2' : arr[i].style.zIndex = null; // add z-index for active slider
					eventElement.target.classList.add('focus');
					let oldx = 0
					this.refFunction = (eventMouse) => {
						this.#moveSlider.call(this, eventElement, eventMouse);
					}
					this.destroy = () => {
						eventElement.target.classList.remove('focus');
						document.querySelector('html').removeEventListener(move, this.refFunction);
						document.querySelector('html').removeEventListener(up, this.destroy);
					}
					document.querySelector('html').addEventListener(move, this.refFunction);
					document.querySelector('html').addEventListener(up, this.destroy);
				})
			});
		}
		functionEventMove('mousedown', 'mousemove', 'mouseup'); // for mouse
		functionEventMove('touchstart', 'touchmove', 'touchend'); // for touch scrinn
	}
	#moveSlider(eventElement, eventMouse){
		const mousePosition = eventMouse.pageX;
		const positionDiv = this.$selector.getBoundingClientRect().left;
		const widthDiv = this.$selector.offsetWidth;
		let circlePosition = (mousePosition - positionDiv) / widthDiv;
		(circlePosition <= 0) && (circlePosition = 0);
		(circlePosition >= 1) && (circlePosition = 1);
		if (Array.isArray(this.options.values) == true) {
			const arrValue = this.options.values;
			const positionSlider = (value_1 = arrValue[0], value_2 = arrValue[1]) => [value_1, value_2]
			let value = this.options.min + (circlePosition * (this.options.max - this.options.min));
			if (eventElement.target.classList.contains('slider-min') == true && eventElement.target.classList.contains('focus') == true){
				arrValue[0] = value;
				(arrValue[0] >= arrValue[1]  ) && (arrValue[0] = arrValue[1]); // if value 1 is more than value 2
				this.#positionSlider.bind(this)(arrValue); // slider move
				this.#recordInInput.bind(this)(arrValue); // record value in input
			} else{
				arrValue[1] = value;
				(arrValue[1] <= arrValue[0]) && (arrValue[1] = arrValue[0]); // if value 2 is less than value 2
				this.#positionSlider.bind(this)(arrValue); // slider move
				this.#recordInInput.bind(this)(arrValue); // record value in input
			}
		} else{
			const value = this.options.min + (circlePosition * (this.options.max - this.options.min));
			this.#positionSlider.bind(this)(value);
			const valueWithStep = (Math.round(value / this.options.step) * this.options.step);
			this.#recordInInput.bind(this)(valueWithStep);
		}
	}
	#errorMassage(textError){
		console.error(textError);
	}
	destroy() {
		this.$selector.querySelector('.slider-block').remove();
	}
}

SliderPlugin.getInstance('.sliderPlugin', {}); // use patern Singleton
new SliderPlugin('.sliderPlugin_2', { // create new class
	min: 1,
	max: 500,
	values: [100, 300],
	step: 10,
	charactersAfterDot: 0, // toFixed
});




