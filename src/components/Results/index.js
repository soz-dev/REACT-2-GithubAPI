// == Import : npm
import React from 'react';
import { Card, Button, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './results.scss';

// == Import des deux composants qui permettent le tri
import GridCard from './GridCard';
import ListCard from './ListCard';

const format = {
  grid: GridCard,
  list: ListCard,
};

// Destructuration de la props qui a été créé dans notre statefull componer ( index de app)
const Results = ({
  cardsContent,
  displayMode,
  changeDisplayMode,
  changeViewToRepoDetail,
}) => {
  // On créer à la volée un composant qu'on nomme ViewCard
  const ViewCard = format[displayMode];
  return (
  // Autre syntaxe : <> au debut et </> à la fin
    <React.Fragment>
      <Segment>
        <Button.Group>
          <Button onClick={changeDisplayMode('grid')} positive={displayMode === 'grid'}>Grille</Button>
          <Button.Or />
          <Button onClick={changeDisplayMode('list')} positive={displayMode === 'list'}>Liste</Button>
        </Button.Group>
      </Segment>
      <Card.Group centered>
        {cardsContent.map(currentCardContent => (
          <ViewCard
            changeViewToRepoDetail={changeViewToRepoDetail}
            key={currentCardContent.id}
            {...currentCardContent}
          />
        ))}
      </Card.Group>
    </React.Fragment>
  );
};

Results.propTypes = {
  // Un tableau de ...
  cardsContent: PropTypes.arrayOf(
    // Un d'objet
    // Shape pour préciser l'objet qu'on valide, définir la forme de l'objet
    PropTypes.shape({
      // Il faut Un id unique obligatoire
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  displayMode: PropTypes.string,
  changeDisplayMode: PropTypes.func.isRequired,
  changeViewToRepoDetail: PropTypes.func.isRequired,
};

Results.defaultProps = {
  displayMode: 'grid',
};

export default Results;
