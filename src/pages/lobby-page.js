
class LobbyPage {
  constructor() {
    this.render();
    this.addEventListeners();
  }


  render() {
    const content = document.createElement('div');
    content.setAttribute('id', 'lobby');
    content.innerHTML = `
    <table id='table-selection'>
      <tbody>
      <tr>
      <td><button type="button" class="btn" >1</button></td>
      <td><button type="button" class="btn" >2</button></td>
      <td><button type="button" class="btn" >3</button></td>
      <td><button type="button" class="btn" >4</button></td>
      <td><button type="button" class="btn" >5</button></td>
      <td><button type="button" class="btn" >6</button></td>
      </tr>
      <tr>
      <td><button type="button" class="btn" >7</button></td>
      <td><button type="button" class="btn" >8</button></td>
      <td><button type="button" class="btn" >9</button></td>
      <td><button type="button" class="btn" >10</button></td>
      <td><button type="button" class="btn" >11</button></td>
      <td><button type="button" class="btn" >12</button></td>
      </tr>
      <tr>
      <td><button type="button" class="btn" >13</button></td>
      <td><button type="button" class="btn" >14</button></td>
      <td><button type="button" class="btn" >15</button></td>
      <td><button type="button" class="btn" >16</button></td>
      <td><button type="button" class="btn" >17</button></td>
      <td><button type="button" class="btn" >18</button></td>
      </tr>
      <tr>
      <td><button type="button" class="btn" >19</button></td>
      <td><button type="button" class="btn" >20</button></td>
      <td><button type="button" class="btn" >21</button></td>
      <td><button type="button" class="btn" >22</button></td>
      <td><button type="button" class="btn" >23</button></td>
      <td><button type="button" class="btn" >24</button></td>
      </tr>
      </tbody>
    </table>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(content);
  }

  addEventListeners() {
    document.getElementById('table-selection').addEventListener('click',e =>{
      window.dispatchEvent(new CustomEvent('render-game',{
        detail: {
          level: parseInt(e.target.textContent)
        }
      }));
    });
  }
}

export default LobbyPage;
