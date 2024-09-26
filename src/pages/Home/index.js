import { useState } from 'react';
import { Header } from '../../components/Header'; 
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    try {
      const userDataResponse = await fetch(`https://api.github.com/users/${user}`);
      const newUser = await userDataResponse.json();

      if (newUser.name) {
        const { avatar_url, name, bio, login } = newUser;
        setCurrentUser({ avatar_url, name, bio, login });

        const reposDataResponse = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposDataResponse.json();

        if (newRepos.length) {
          setRepos(newRepos);
        } else {
          setRepos([]); // Se não houver repositórios, garantir que o estado esteja vazio
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setCurrentUser(null); // Resetar o usuário em caso de erro
      setRepos([]); // Resetar os repositórios em caso de erro
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input 
              name="usuario" 
              value={user} 
              onChange={event => setUser(event.target.value)} 
              placeholder="@username" 
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name && ( 
            <>
              <div className="perfil">
                <img src={currentUser.avatar_url} className="profile" alt="img do perfil" />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          )}
          {repos.length > 0 && ( 
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repo => (
                <ItemList key={repo.id} title={repo.name} description={repo.description} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
