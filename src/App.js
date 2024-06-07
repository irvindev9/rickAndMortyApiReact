import { Component } from 'react';
import { characters } from './api/characters';

import Card from "./components/Card";
import SearchBtn from "./components/SearchBtn";
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      charactersList: [],
      filterCharacters: [],
      selectedCharacter: null,
      actualPage: 1
    }
  }

  async componentDidMount(){
    await this.getCharactersList();
  }

  async getCharactersList(page = 1){
    const { data } = await characters(page);
    this.setState({ charactersList: data });

    this.setState({ filterCharacters: data });

    this.setState({
      selectedCharacter: data.results[0]
    });
  }
  
  render() {
    const { filterCharacters } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Card character={this.state.selectedCharacter} />
          <SearchBtn onChangeHandler={this.filterMonsters} />
            <button className="btn btn-info my-2" onClick={() => {
              const newPage = this.state.actualPage + 1;
              this.setState({
                actualPage: newPage
              })
              this.getCharactersList(newPage)
            }}>Next page</button>
            <ul>
                {
                  filterCharacters?.results ? filterCharacters.results.map((character, index) => 
                    <li key={index} className='listedCharacter'>
                      <a onClick={() => {
                        this.setState({selectedCharacter: character})
                      }} href='/#'>{character.name}</a>
                    </li>
                  ) : ''
                }
            </ul>
        </header>
      </div> 
    );
  }

  filterMonsters = (name) => {
    const filterCharacters = this.state.charactersList.results.filter(character => {
      return character.name.toLowerCase().includes(name.toLowerCase());
    })

    if(filterCharacters.length > 0){ 
      this.setState({
        filterCharacters: {
          results: filterCharacters
        }
      })
    } else{ 
      this.setState({
        filterCharacters: this.state.charactersList.results
      })
    }
  }
}

export default App;
