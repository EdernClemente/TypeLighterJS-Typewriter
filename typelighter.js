//INJECTING CSS, you can also paste it in your CSS file.
function addCssCursor() {
    "use strict";
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".cursor {color:inherit;position:relative;font:inherit;color:inherit;line-height:inherit;animation: Cursor 1s infinite;}@keyframes Cursor{0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}};"
    document.body.appendChild(css);
}

class Typewriter {
    constructor(el, userText) {
        this.userText        = userText;
        this.speed           = parseInt(el.getAttribute("data-speed"), 10) || 1;
        this.startDelay      = parseInt(el.getAttribute("data-start"), 10) || 500;
        this.endDelay        = parseInt(el.getAttribute("data-end"), 10) || 2000;
        this.isRandomlyTimed = el.getAttribute("data-random") !== "false";
        this.loopThreshold   = parseFloat(el.getAttribute("data-max")) || false;
        this.deleteSpeed     = el.getAttribute("data-dltSpeed") !== "false";
        this.el              = el;
        this.isRunning       = false;
        this.loopNumber      = 0;
        this.text            = "";
        this.isDeleting      = false;
        this.handler         = function() {};

        var cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.innerHTML = "|";
        this.el.parentNode.appendChild(cursor);

        if (el.getAttribute("data-checkVisible") == "true") {
            this.checkVisible();
        } else {
            this.loop();
        }
    }

    loop() {
        if (this.loopThreshold && (this.loopNumber) > (this.loopThreshold)) { return; }

        //The first execution is delayed
        if (this.loopNumber !== 0) {
            //Grabbing the appropriate string
            var fullText = this.userText[Math.floor(this.loopNumber - 0.5) % this.userText.length];

            this.text = fullText.substring(0, this.text.length + (this.isDeleting ? -1 : 1));

            this.el.innerHTML = '<span class="wrap">' + this.text + '</span>';

            var delta;

            if (this.text === "" && this.isDeleting) {
                this.isDeleting = false;
                this.loopNumber += 0.5;
                delta = this.startDelay;
            } else if (this.text === fullText && !this.isDeleting) {
                delta = this.endDelay;
                this.isDeleting = true;
                this.loopNumber += 0.5;
            } else {
                if (this.isDeleting && this.deleteSpeed) {
                    delta = 50 / this.speed;
                } else {
                    delta = (this.isRandomlyTimed ? (200 - Math.random() * 10) / this.speed : 100 / this.speed);
                }
            }
        } else {
            var delta = this.startDelay;
            this.loopNumber += 0.5;
        }

        setTimeout(() => this.loop(), delta);
    }

    //Check the visibility of an element when "checkVisible" is enabled
    checkVisible() {

        var that = this;

        this.handler = onVisibilityChange(this.el, function() {

            if (window.removeEventListener) {
                removeEventListener('DOMContentLoaded', that.handler, false); 
                removeEventListener('load', that.handler, false); 
                removeEventListener('scroll', that.handler, false); 
                removeEventListener('resize', that.handler, false); 
            } else if (window.detachEvent)  {
                detachEvent('onDOMContentLoaded', that.handler); // IE9+ :(
                detachEvent('onload', that.handler);
                detachEvent('onscroll', that.handler);
                detachEvent('onresize', that.handler);
            }

            that.loop();
        });
        
        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', this.handler, false); 
            addEventListener('load', this.handler, false); 
            addEventListener('scroll', this.handler, false); 
            addEventListener('resize', this.handler, false);
        } else if (window.attachEvent)  {
            attachEvent('onDOMContentLoaded', this.handler); // IE9+ :(
            attachEvent('onload', this.handler);
            attachEvent('onscroll', this.handler);
            attachEvent('onresize', this.handler);
        }
        this.handler();
    }
}

function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

function onVisibilityChange(el, callback) {
    var old_visible = false;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

window.onload = function () {
    var elements = document.getElementsByClassName("typeWriter");
    for (var i=0; i< elements.length; i++) {
        var userText = elements[i].getAttribute("data-text");
        if (userText) {
        //Creating an object and parsing the string into an array
          new Typewriter(elements[i], JSON.parse(userText));
        }
    }
    addCssCursor();
}

