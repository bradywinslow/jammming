import { Flex } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header.jsx';
import LoginToSpotify from '../LoginToSpotify.jsx';
import SearchBar from '../SearchBar.jsx';

export default function HomePage() {
    return (
        <Flex align='center' justify='center' flexDirection='column' h='55vh' m='auto'>
            <Header />
            <LoginToSpotify />
            <SearchBar />
        </Flex>
    )
}
