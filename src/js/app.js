class SliderPlagin {
    constructor(selector, options) {
        const defatulOptions = {
            min: 0,
            max: 100,
			// values: 50,
			values: [ 20, 40],
            step: 0.01,
			roundValue: 2
        }
        this.options = Object.assign(defatulOptions, options);
        this.$selector = (selector.tagName !== undefined) ? selector : document.querySelector(selector); // check selector is a teg, or simple name class or, id;
        this.#renderInSelector(); // render html
		this.#startingInfo(); // basic layout
		this.#eventMousemove(); // event mousemove	
	}
    #renderInSelector(){
		const sliderHTML = (Array.isArray(this.options.values) == true) ? `<div class='slider-circle slider-min'></div><div class='slider-circle slider-max'></div>` : `<div class='slider-circle slider-single'></div>`;
		this.$selector.insertAdjacentHTML('afterbegin', `<div class="slider-block">${sliderHTML} <div class='progress-slider'></div> </div>`);
    }
	#startingInfo(){
		this.#recordInInput.call(this, this.options.values); // record information in input
		this.#positionSlider.call(this, this.options.values); // position slider
	}
	#recordInInput(values){
		if (Array.isArray(this.options.values) == true){
			this.$selector.querySelectorAll('input')[0].value = values[0];
				this.$selector.querySelectorAll('input')[0].setAttribute('value', values[0]);
			this.$selector.querySelectorAll('input')[1].value = values[1];
				this.$selector.querySelectorAll('input')[1].setAttribute('value', values[1]);
		} else{
			this.$selector.querySelectorAll('input')[0].value = values;
				this.$selector.querySelectorAll('input')[0].setAttribute('value', values);
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
			this.$selector.querySelectorAll('.slider-circle').forEach((el) => {
				el.addEventListener(down, (eventElement) => {
					this.refFunction = (eventMouse) => {
						// code hear
						this.moveSlider.call(this, this, eventElement, eventMouse);
					}
					this.destroy = () => {
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
	moveSlider(th, eventElement, eventMouse){
		const mousePosition = eventMouse.pageX;
		const positionDiv = eventElement.target.closest(`.${th.$selector.className}`).getBoundingClientRect().left;
		const widthDiv = eventElement.target.closest(`.${th.$selector.className}`).offsetWidth;
		if (Array.isArray(this.options.values) == true) {
			console.log(eventElement);
			th.#positionSlider([10, 70])
		} else{
			let circlePosition = (mousePosition - positionDiv) / widthDiv;
			(circlePosition <= 0) && (circlePosition = 0);
			(circlePosition >= 1) && (circlePosition = 1);
			const value = th.options.min + (circlePosition * (th.options.max - th.options.min));
			this.#positionSlider.bind(th)(value);
			const valueWithStep = (Math.round(value / th.options.step) * th.options.step).toFixed(th.options.roundValue)
			this.#recordInInput.bind(th)(valueWithStep);
		}
	
		
	}









}






document.querySelectorAll('.sliderPlagin').forEach((e) => {
    const callSliderPlagin = new SliderPlagin(e, {})
});


