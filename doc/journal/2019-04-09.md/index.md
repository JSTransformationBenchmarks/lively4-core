## 2019-04-09

Dragged in an album from plex

<plex-link src="plex://library/metadata/1741/"></plex-link>

## Identity is a bitch!

I originally dragged in an album with this link...

![](https://lively-kernel.org/lively4/lively4-jens/doc/journal/2019-04-09.md/plex_link.png)

But I opened it on another system... and the address resolved, but to something completely different. References vs. Values all over again! #TODO plex urls should maybe include a server id?

![](https://lively-kernel.org/lively4/lively4-jens/doc/journal/2019-04-09.md/plex_link_a.png)

## 2019-04-09 Turn a \<div\> into a clock with #AExprs

```javascript
that.innerHTML = ''
that.style.position = 'fixed'
import { aexpr as aexprTicking } from "active-expression-frame-based";
that.appendChild(<span>{aexprTicking(() => new Date().toTimeString().substring(0,5))}</span>)
```
