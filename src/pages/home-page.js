class HomePage {
  constructor(args) {
    this.render();
    this.addEventListeners();
  }

  render() {
    const content = document.createElement('div');
    content.setAttribute('id', 'home');
    content.innerHTML = `<button type="button" class="btn"  id='play-button'>Play</button>`;
    document.body.innerHTML = '';
    document.body.appendChild(content);
  }

  addEventListeners() {
    document.getElementById('play-button').addEventListener('click',e =>{
      window.dispatchEvent(new CustomEvent('render-lobby'));
    });
  }
}

export default HomePage;
