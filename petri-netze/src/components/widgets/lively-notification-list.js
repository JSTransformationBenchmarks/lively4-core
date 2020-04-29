'use strict';

import Morph from 'src/components/widgets/lively-morph.js';
import lively from 'src/client/lively.js'

export default class NotificationList extends Morph {
  
  addNotification(title, message, timeout, moreCallBack, color) {
    var notification = document.createElement("lively-notification")
    notification.title = title
    notification.message = message
    notification.more = moreCallBack
    notification.color = color
    
    lively.components.openIn(this, notification).then( () => {
      this.hidden = false;
      if (timeout === undefined) timeout = 7;
      setTimeout(() => notification.onClose(), timeout * 1000); 
    })

  }

  clear() {
    Array.from(this.childNodes).forEach(ea => this.removeChild(ea))
  }
  
  hideIfEmpty( ) {
    if (this.childNodes.length === 0) {
      this.hidden = true
    } else {
      this.hidden = false
    }
  }
}