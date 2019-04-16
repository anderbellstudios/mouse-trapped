let Togglable = (superclass) => class extends superclass {
  isOpen(time) {
    if (this.state === undefined) {
      this.state = this.default_state;
    }

    return this.state;
  }

  received_action(action) {
    switch (action) {
      case 'toggle':
        this.state = !this.state;
        break;
      case 'pullOpen':
        this.state = true;
        break;
      case 'pullClosed':
        this.state = false;
        break;
    }
  }
}
