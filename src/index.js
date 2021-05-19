import HomePage from './pages/home-page';
import LobbyPage from './pages/lobby-page';
import GamePage from './pages/game-page';


window.addEventListener('render-home', (e) => {window.page = new HomePage(e.detail)});
window.addEventListener('render-lobby', (e) =>{window.page =  new LobbyPage(e.detail)});
window.addEventListener('render-game', (e) =>{window.page =  new GamePage(e.detail)});

window.addEventListener('switch-lang', (e) => {

  // console.log(e.detail);
  window._client.auth.save().then(function() {
    switch (e.detail.render) {
      case 'home':
        window.page = new HomePage(e.detail);
        break;

      case 'lobby':
        window.page = new LobbyPage(e.detail);
        break;

      case 'game':
        window.page = new GamePage(e.detail);
        break;
        
      default:
        break;
    }
  });
});

window.onload = () => new HomePage();