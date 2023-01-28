import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };
  return (
    <Header>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchFormButton type="submit">
          <BsSearch style={{ width: 25, height: 25 }} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class SearchBar extends Component {
//   state = {
//     query: '',
//   }
//   handleChange = e =>{
//     this.setState({query: e.currentTarget.value})
//   }
//   handleFormSubmit = e =>{
//     e.preventDefault()

//   this.props.onSubmit(this.state.query)
//   this.setState({query: ''})
//   }

//     render() {
//         return (
//           <Header>
//             <SearchForm onSubmit={this.handleFormSubmit}>
//               <SearchFormButton type="submit">
//                 <BsSearch style={{ width: 25, height: 25 }} />
//               </SearchFormButton>

//               <SearchFormInput
//                 type="text"
//                 autocomplete="off"
//                 autoFocus
//                 placeholder="Search images and photos"
//                 value={this.state.query}
//                 onChange={this.handleChange}
//               />
//             </SearchForm>
//           </Header>
//         );
//     }
// }
// export default SearchBar
