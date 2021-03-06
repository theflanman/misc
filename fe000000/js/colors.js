let Colors = {
  themeColors: {
    'Dark': {
      '--background-color': '#000000',
      '--text-color': '#ffffff',
    },
    'Light': {
      '--background-color': '#ffffff',
      '--text-color': '#000000',
    }
  },
  updateColors() {
    let table = this.themeColors[Options.theme()];
    for (let i in table) {
      document.documentElement.style.setProperty(i, table[i]);
    }
  },
  colorToRgb(x) {
    return [parseInt(x.slice(1, 3), 16), parseInt(x.slice(3, 5), 16), parseInt(x.slice(5, 7), 16)];
  },
  backgroundColor() {
    return this.colorToRgb(this.themeColors[Options.theme()]['--background-color']);
  },
  interpolate(a, b, dimmed) {
    return [0, 1, 2].map(i => a[i] * (1 - dimmed) + b[i] * dimmed);
  },
  makeColor(x, dimmed) {
    // Handle true and false properly.
    x = +x;
    let r = x <= 1 / 4 ? 1 - x * 8 / 5 : (1 - x) * 4 / 5;
    let g = x * 4 / 5;
    return 'rgb(' + this.interpolate(this.backgroundColor(), [255 * r, 255 * g, 0], dimmed).map(Math.floor).join(', ') + ')';
  },
  makeStyle(x, isChallenge) {
    if (player.options.completionColors === 'Off') {
      return 'var(--background-color)';
    } else if (player.options.completionColors === 'On (uniform)') {
      return this.makeColor(x, 0.5);
    } else if (player.options.completionColors === 'On (gradient)') {
      let a = isChallenge ? 'var(--background-color)' : this.makeColor(x, 1);
      let b = isChallenge ? this.makeColor(x, 1) : 'var(--background-color)';
      return 'radial-gradient(' + a + ', ' + b + ')';
    }
  }
}
