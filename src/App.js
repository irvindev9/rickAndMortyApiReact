import { useState, useEffect } from 'react';
import { characters } from './api/characters';

import Card from "./components/Card";
import SearchBtn from "./components/SearchBtn";
import './App.css';

const App = () => {
  const [charactersList, setCharacterList] = useState([]);
  const [filterCharacters, setFilterCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [actualPage, setActualPage] = useState(1);

  const getCharactersList = async (page = 1) => {
    const { data } = await characters(page);
    setCharacterList(data)
    setFilterCharacters(data);
    setSelectedCharacter(data.results[0]);
  }

  useEffect(() => {
    getCharactersList();
  },[]);

  const filterMonsters = (name) => {
    const filterCharactersCleaned = charactersList.results.filter(character => {
      return character.name.toLowerCase().includes(name.toLowerCase());
    })

    console.log(filterCharactersCleaned)

    if(filterCharactersCleaned.length > 0){ 
      setFilterCharacters({
        ...filterCharacters,
        results: filterCharactersCleaned
      })
    } else{ 
      setFilterCharacters({
        ...charactersList
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Card character={selectedCharacter} />
        <SearchBtn onChangeHandler={filterMonsters} />
          <button className="btn btn-info my-2" onClick={() => {
            const newPage = actualPage + 1;
            setActualPage(newPage);
            getCharactersList(newPage)
          }}>Next page</button>
          <ul>
              {
                filterCharacters?.results ? filterCharacters.results.map((character, index) => 
                  <li key={index} className='listedCharacter'>
                    <a onClick={() => {
                      setSelectedCharacter(character)
                    }} href='/#'>{character.name}</a>
                  </li>
                ) : ''
              }
          </ul>
      </header>
    </div> 
  );
}

// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       charactersList: [],
//       filterCharacters: [],
//       selectedCharacter: null,
//       actualPage: 1
//     }
//   }

//   async componentDidMount(){
//     await this.getCharactersList();
//   }

//   render() {
//     const { filterCharacters } = this.state;

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <Card character={this.state.selectedCharacter} />
    //       <SearchBtn onChangeHandler={this.filterMonsters} />
    //         <button className="btn btn-info my-2" onClick={() => {
    //           const newPage = this.state.actualPage + 1;
    //           this.setState({
    //             actualPage: newPage
    //           })
    //           this.getCharactersList(newPage)
    //         }}>Next page</button>
    //         <ul>
    //             {
    //               filterCharacters?.results ? filterCharacters.results.map((character, index) => 
    //                 <li key={index} className='listedCharacter'>
    //                   <a onClick={() => {
    //                     this.setState({selectedCharacter: character})
    //                   }} href='/#'>{character.name}</a>
    //                 </li>
    //               ) : ''
    //             }
    //         </ul>
    //     </header>
    //   </div> 
    // );
//   }

  // filterMonsters = (name) => {
  //   const filterCharacters = this.state.charactersList.results.filter(character => {
  //     return character.name.toLowerCase().includes(name.toLowerCase());
  //   })

  //   if(filterCharacters.length > 0){ 
  //     this.setState({
  //       filterCharacters: {
  //         results: filterCharacters
  //       }
  //     })
  //   } else{ 
  //     this.setState({
  //       filterCharacters: this.state.charactersList.results
  //     })
  //   }
  // }
// }

export default App;
