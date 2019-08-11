# TypeLighter.js - Just 1.04KB gzip - 12x lighter
<br>
<img width="100%" src="https://raw.githubusercontent.com/EdernClemente/TypeLighterJS/master/images/typelighter.gif">

**The world's lightest yet most powerful JS TypeWriter out there. (Without JQUERY)**<br>
For more information, please, check [typelighterjs.com](https://edernclemente.com/plugin/typelighterjs).<br>
>[Download ZIP](https://github.com/EdernClemente/TypeLighterJS/archive/master.zip)

# Description :

**TypeLighter.js** is a free plugin to add **typewriters** in your web page. 
With this plugin, **eight properties** allow you to fine-tune the experience you want to share with your users. 
Most of them are predefined, but you can change their values using the **data attribute**.

# Files :
**There are three files** in the compressed folder :

- README.md
- typelighter.js<br>
- typelighter.min.js -> minified file

# Installation :

Place the <code>.js file</code> in your folder and import it after the <code>body tag</code> :
```html
<script src ="your file path/typelighter.min.js"></script>
```

You can also use the CDN version :
```html
<script src ="https://cdn.jsdelivr.net/npm/typelighterjs/typelighter.min.js"></script>
```

Add a new typewriter with a <code>span</code> tag :

```html
<p><span class="typeWriter" data-text='["foo"]'></span></p>
```
<img width="80%" src="https://raw.githubusercontent.com/EdernClemente/TypeLighterJS/master/images/foo.gif">

# Properties list :
| Property          | Default value | Use |
| ---               | ---           | --- |
| data-text         | Null          | The array holding the strings to be written one after the other. |
| data-speed        | 1             | The writing speed is proportionnal to this integer. |
| data-start        | 500 (ms)      | A delay before writing the next string. |
| data-end          | 2000 (ms)     | A delay before deleting the current string. |
| data-random       | True          | When enabled, the TypeWriter waits for a random time before writing or deleting the next character. |
| data-max          | Infinity      | The maximum number of full iterations before the TypeWriter stops itself. |
| data-dltSpeed     | True          | When enabled, a given string is deleted twice as fast as it is written. |
| data-checkVisible | False         | When enabled, the animation begins right when the element appears in the viewport. |

# Example :

```html
<p><span class="typeWriter" data-checkVisible="true"  data-speed="2" data-text='["foo", "example"]'></span></p>
```
<img width="80%" src="https://raw.githubusercontent.com/EdernClemente/TypeLighterJS/master/images/fooexample.gif">

```html
<p>Hello <span class="typeWriter" data-end="3000" data-text='["guys !", "world !"]'></span></p>
```
<img width="80%" src="https://raw.githubusercontent.com/EdernClemente/TypeLighterJS/master/images/guysworld.gif">

# CSS :
The CSS is **automatically injected** in the DOM for convenience, though you could also paste it in your CSS file :
```css
.cursor {
  color:inherit;
  position:relative;
  font:inherit;
  color:inherit;
  line-height: inherit;
  animation: Cursor 1s infinite;
}

@keyframes Cursor{
  0%{opacity: 1;}
  50%{opacity: 0;}
  100%{opacity: 1;}
}
```
Enjoy :heart_eyes:

*This project is licensed under the terms of the MIT license.*
