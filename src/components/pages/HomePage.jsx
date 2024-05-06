import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header.jsx';
import LoginToSpotify from '../LoginToSpotify.jsx';
import SearchBar from '../SearchBar.jsx';

export default function HomePage() {
    return (
        <Flex align='center' justify='center' flexDirection='column' h='100vh' m='auto'>
            <Header />
            <Heading as='h2' size='md' mt='-2rem' mb='10'>
                A Spotify Playlist Builder
            </Heading>
            <LoginToSpotify />
            <SearchBar />
        </Flex>
    )
}
