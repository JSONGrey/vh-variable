class Resizer{
    private static throttled = (delay:number, fn:any) => {
        let lastCall = 0;
        return (...args:any) => {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }

            lastCall = now;
            return fn(...args);
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
