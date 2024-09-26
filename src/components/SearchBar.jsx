import React, { useState } from 'react';
import { spotifySearch } from '../spotify/httpRequests.js';
import { useNavigate } from 'react-router-dom';
import { Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { GoSearch } from "react-icons/go";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    
    const navigate = useNavigate();
  
    const handleSpotifySearch = async (searchInput) => {
      const searchData = await spotifySearch(searchInput);

      navigate('/create-playlist', { state: searchData });
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (e) => {        
        if (e.key === 'Enter' && searchInput) {
            e.preventDefault();
            handleSpotifySearch(searchInput);
            setSearchInput('');
        } else if (e.key === 'Enter' && searchInput === '') {
            e.preventDefault();
        }
    };

    return (
        <search>
            <Flex onKeyDown={handleKeyDown}>
                <Flex align='center' flexDirection='column'>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={GoSearch} color='#0F062C'/>
                        </InputLeftElement>
                        <Input
                            type='text'
                            id='searchBar'
                            autoComplete='off'
                            value={searchInput}
                            onChange={handleInputChange}
                            size='md'
                            bg='#FFFFFF'
                            color='#0F062C'
                            variant='outline'
                            focusBorderColor='#D9D9D9'
                            w={[250, 300, 350]}
                            mb={7}
                            placeholder='Search by song, artist, or album'
                        ></Input>
                    </InputGroup>
                </Flex>
            </Flex>
        </search>
    )
}
