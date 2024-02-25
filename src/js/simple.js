class TestPlagin {
    constructor(selector, options) {
        const defaultOptions = {
            className: "testClass"
        }
        this.options = Object.assign(defaultOptions, options);
        this.$selector = document.querySelector(selector);
        this.eventClick();
    }
    eventClick() {
        this.$selector.addEventListener('click', (e) => {

        });
    }
    eventExternal(event, functionEvent) {

        this.$selector.addEventListener(event, functionEvent)
    }
}


const callPlagin = new TestPlagin('.block', {})



callPlagin.eventExternal(`mousemove`, (e) => {
    console.log(e)
})


