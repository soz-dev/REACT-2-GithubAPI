import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GridCard = ({
  owner,
  description,
  name,
  changeViewToRepoDetail,
  url,
}) => {
  // Je destructure owner pour récup seulement avatar et login
  // On met un alias car ESL demande du kamelCase
  const { avatar_url: avatarUrl, login } = owner;
  return (
    <Card onClick={changeViewToRepoDetail(url)}>
      <Image src={avatarUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          {login}
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

GridCard.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  changeViewToRepoDetail: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

GridCard.defaultProps = {
  // Valeur par défaut donnée au props
  description: '',
};


export default GridCard;
