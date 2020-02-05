// == Import : npm
import React from 'react';
import axios from 'axios';

// == Import : local
import './app.scss';
import 'semantic-ui-css/semantic.min.css';
import SearchBar from 'src/components/SearchBar';
import Results from 'src/components/Results';
import RepoDetail from 'src/components/RepoDetail';

// == Impot : data en dur
// import fixedData from 'src/data/results';


// == Composant
class App extends React.Component {
  state = {
    // De base nos données sont un tableau vide car on n'a encore rien récupéré
    cardsContent: [],
    // Par défaut l'user n'a rien écrit
    searchInputValue: '',
    // Par défaut notre sous composant loading ne tourne pas
    loading: false,
    view: 'welcome',
    displayMode: 'grid',
    url: '',
    repoDetailData: [],
  }

  // Permet de classer les resulats par liste ou grid
  changeDisplayMode = newDisplayMode => () => {
    this.setState({
      displayMode: newDisplayMode,
    });
  }

  changeInputValue = (newInputValue) => {
    this.setState({
      searchInputValue: newInputValue,
    });
  }

  // Fonction qui retourne une autre fonction, appellée au OnCLick
  changeViewToRepoDetail = url => () => {
    // console.log('Je veux aller sur', url);
    this.setState({
      url,
      view: 'repoDetail',
    });
  }

  saveResponse = (response) => {
    const newCardContent = response.data.items.map(item => ({
      // Id a mettre pour avoir une clé unique sur chaque element
      id: item.id,
      description: item.description,
      name: item.name,
      url: item.url,
      owner: {
        avatar_url: item.owner.avatar_url,
        login: item.owner.login,
      },
    }));

    // Modification du state avec ces données
    this.setState({
    // On modifie les donnés des cartes, passant d'un tableau vide à la récup des données du data
      cardsContent: newCardContent,
      // Changer le state pour dire qu'on ne charge plus,, loading false
      loading: false,
      view: 'repo',
      searchInputValue: '',
    });
  }

  showError = (error) => {
    console.log('error', error);
  }

  doSearch = () => {
  // Contact de l'api avec searchInputValue
    this.setState({
      loading: true,
    });


    // Contacter l'api avec le mot clé recherché ( searchInputValue )
    // { searchInputValue } représente la recherche dynamique de l'user, il est défini dans notre state donc on le destructure
    const { searchInputValue } = this.state;
    axios.get(`https://api.github.com/search/repositories?q=${searchInputValue}`)
      .then(this.saveResponse)
      .catch(this.showError);
  }

  saveRepoDetailResponse = (newRepoDetail) => {
    this.setState({
      repoDetailData: newRepoDetail.data,
      loading: false,
      view: 'repoDetail',
    });
  };

    fetchRepoDataFromUrl = (url) => {
      // changer le state pour renseigner un statut loading à true
      this.setState({
        loading: true,
        // On veut vider les anciennes data sinon ça fera un bug image
        repoDetailData: [],
      });
      // contacter l'api avec l'url qui nous interesse
      axios.get(`${url}/contents`)
        .then(this.saveRepoDetailResponse)
        .catch(this.showError);
      // recupération des données de l'api
      // modification du state avec ces données
      // changer le state pour dire qu'on ne charge plus, loading: false, et passer à la vue repo
    }

    render() {
    // Récuparation des data et l'input de luser, depuis le state on le déstructure
      const {
        cardsContent,
        searchInputValue,
        loading,
        view,
        displayMode,
        url,
        repoDetailData,
      } = this.state;
      return (
        <div id="app">
          <SearchBar
        // Je transmet à SearchBar les methodes
            searchInputValue={searchInputValue}
            changeInputValue={this.changeInputValue}
            doSearch={this.doSearch}
            loadingStatus={loading}
          />
          {/* Ici je transmet mes states à results
        Si la condition vaut true on affiche le contenu
        && regarde la premiere condition, si elle vaut false il s'arrete là,
        sinon il regarde jusqu'a la deuxieme condition et affiche la vue demandée si c'est true */}
          {view === 'repo' && (
            <Results
              displayMode={displayMode}
              cardsContent={cardsContent}
              changeDisplayMode={this.changeDisplayMode}
              changeViewToRepoDetail={this.changeViewToRepoDetail}
            />
          )}
          {/* De base notre view est à welcome donc cela affichera Bonjour ... : */}
          {view === 'welcome' && (
          <div>
          Bonjour, saisissez votre recherche dans le champ
          </div>
          )}
          {view === 'repoDetail' && (
          <div>
            <RepoDetail
              fetchRepoDataFromUrl={this.fetchRepoDataFromUrl}
              url={url}
              repoDetailData={repoDetailData}
              loading={loading}
            />
          </div>
          )}
        </div>
      );
    }
}


// == Export
export default App;
