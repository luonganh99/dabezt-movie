import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import './SearchForm.scss';

function SearchForm() {
    const [searchValue, setSearchValue] = useState('');
    const typingTimeoutRef = useRef(null);
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            if (value.length === 0) {
                history.push('/');
            } else {
                history.push(`/search/${value}/1`);
            }
        }, 250);
    };

    return (
        <div className='search'>
            <InputGroup>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder='Search Movie' value={searchValue} onChange={handleChange} />
            </InputGroup>
        </div>
    );
}

export default SearchForm;
