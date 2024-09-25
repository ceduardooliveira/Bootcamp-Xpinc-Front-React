import {Header} from '../../components/Header'; 
import background from '../../assets/background.png'
import './styles.css';


function App() {
  return (<div className="App">
      <Header/>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"></img>
        <div className="info">
          <div>
            <input name="usuario" placeholder="@username"></input>
            <button>Buscar</button>
          </div>
          <div>
            <img src="https://avatars.githubusercontent.com/u/80528603?v=4" className="profile" alt="img do perfil"></img>
            <div className="perfil">
              <h3>Carlos Eduardo</h3>
              <span>@ceduardooliveira</span>
              <p>Descrição</p>
            </div>
          </div>
          <hr/>
        </div>
      </div>
    </div>
  );
}

export default App;
