// == Import : npm
import React from 'react';
import { Form, Segment, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './searchBar.scss';

// == StateFull Component
class SearchBar extends React.Component {
  // Quand c'est lié directement à la classe et non à l'instance il faut mettre static, sinon erreur
  static defaultProps = {
    searchInputValue: '',
  }

  static propTypes = {
    searchInputValue: PropTypes.string,
    changeInputValue: PropTypes.func.isRequired,
    doSearch: PropTypes.func.isRequired,
    loadingStatus: PropTypes.bool.isRequired,
  }

  // création d'une fonction permettant, à l'event
    changeHandler = (event) => {
      // on destructure
      const { changeInputValue } = this.props;
      // On destructure la value de l'event
      const { value } = event.target;
      changeInputValue(value);
    }

    render() {
      const { searchInputValue, doSearch, loadingStatus } = this.props;
      return (
        <Segment inverted>
          <Form onSubmit={doSearch} inverted>
            <Form.Field>
              <Input
                value={searchInputValue}
                type="text"
                placeholder="Saisissez votre recherche"
                onChange={this.changeHandler}
                loading={loadingStatus}
              />
            </Form.Field>
          </Form>
        </Segment>
      );
    }
}


export default SearchBar;
