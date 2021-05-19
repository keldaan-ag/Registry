
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
      <td><button>1</button></td>
      <td><button>2</button></td>
      <td><button>3</button></td>
      <td><button>4</button></td>
      <td><button>5</button></td>
      <td><button>6</button></td>
      </tr>
      <tr>
      <td><button>7</button></td>
      <td><button>8</button></td>
      <td><button>9</button></td>
      <td><button>10</button></td>
      <td><button>11</button></td>
      <td><button>12</button></td>
      </tr>
      <tr>
      <td><button>13</button></td>
      <td><button>14</button></td>
      <td><button>15</button></td>
      <td><button>16</button></td>
      <td><button>17</button></td>
      <td><button>18</button></td>
      </tr>
      <tr>
      <td><button>19</button></td>
      <td><button>20</button></td>
      <td><button>21</button></td>
      <td><button>22</button></td>
      <td><button>23</button></td>
      <td><button>24</button></td>
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
