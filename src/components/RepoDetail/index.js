import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class RepoDetail extends React.Component {
  // Quand le composant est monté, :
  componentDidMount() {
    // On extrait url des props
    const { url, fetchRepoDataFromUrl } = this.props;
    fetchRepoDataFromUrl(url);
  }

  // Return du JSX
  render() {
    const { repoDetailData } = this.props;
    return (
      <Table celled>
        <Table.Body>
          {repoDetailData.map(({ name, sha }) => (
            <Table.Row key={sha}>
              <Table.Cell>{name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

RepoDetail.propTypes = {
  url: PropTypes.string.isRequired,
  fetchRepoDataFromUrl: PropTypes.func.isRequired,
  repoDetailData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RepoDetail;
