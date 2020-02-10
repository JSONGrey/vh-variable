class Resizer{
    private static throttled = (threshold:number, fn:any) => {
        let last;
        let timeout;
        return (...args:any) => {
            const now = Date.now();
            const shouldDelay = last && now < last + threshold;
            const delay = shouldDelay === true ? threshold - (now - last) : 0;

            const execute = () => {
                last = now
                fn(...args)
            };

            clearTimeout(timeout);
            timeout = setTimeout(execute, delay);
        };
    };

    private setVh = ():void => {
        try{
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        } catch (error){
            document.documentElement.style.removeProperty('--vh');
            throw new Error(error);
        }
    };

    private resizeListener = ():void => {
        this.setVh();
    };

    public resizeListenerOptimized = Resizer.throttled(300, this.resizeListener);

    public orientaionChange = ():void => {
        setTimeout(this.setVh, 200);
    }
}

const ResizeObject = new Resizer();

exports.resizeListener = (() => {
    ResizeObject.resizeListenerOptimized();
    window.addEventListener('resize', ResizeObject.resizeListenerOptimized);
    window.addEventListener('scroll', ResizeObject.resizeListenerOptimized);
    window.addEventListener('orientationchange', ResizeObject.orientaionChange);
})();
