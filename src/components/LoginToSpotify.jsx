import React, { useState, useEffect } from 'react';
import { FaSpotify } from "react-icons/fa";
import { retrieveTokenFromUrlHash, handleLogin } from '../spotify/authorization.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Button,
    useDisclosure,
    Flex,
    Icon
  } from '@chakra-ui/react'

export default function LoginToSpotify() {    
    const { isOpen } = useDisclosure({ defaultIsOpen: true });

    const [loggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the hash contains access_token, indicating successful login
        if (window.location.hash.includes('access_token')) {
            // Call authorization function
            retrieveTokenFromUrlHash();
            setIsLoggedIn(true);
            // Store in local storage that the user is logged in
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            // Check if the user is already logged in from previous session --> this make sure that the modal won't appear if the back button is user or if the page is refreshed
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                setIsLoggedIn(true);
            }
        }
    }, []); // Empty dependency array so effect only runs once

    return (
        <>
            {!loggedIn && <Modal blockScrollOnMount={true} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent color='#0F062C'>
                    <Flex flexDirection='column' alignItems='center' m={4}>
                        <ModalHeader>Jammming - Spotify Playlist Builder</ModalHeader>
                        <ModalBody>
                            <Text align='center' mb='1rem'>
                                Welcome to Jammming, the application that allows you to search for songs, albums, or artists, and build and save playlists. Login to begin.
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                justify='center'
                                bg='#1DB954'
                                color='#191414'
                                _hover={{
                                    bg: '#1CB050'
                                }}
                                _active={{
                                    bg: '#15843C'
                                }}
                                mr={3}
                                size='lg'
                                onClick={handleLogin}
                            >
                                Login to Spotify <Icon as={FaSpotify} ml={1} boxSize='1.25rem'/>
                            </Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>}
        </>
    )
};
