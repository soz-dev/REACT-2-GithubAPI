import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ListCard = ({ name, changeViewToRepoDetail, url }) => (
  <Card fluid onClick={changeViewToRepoDetail(url)}>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

ListCard.propTypes = {
  name: PropTypes.string.isRequired,
  changeViewToRepoDetail: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default ListCard;
