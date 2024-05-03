import React, { useState } from 'react';
import { addToPlaylist } from '../spotify/httpRequests.js';
import { FiMinus } from "react-icons/fi";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Button,
    Icon,
    Heading,
    Input
  } from '@chakra-ui/react';

export default function Playlist({ playlistTracks, removeSearchResultFromPlaylist }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    // const [showPlaylistContainer, setShowPlaylistContainer] = useState();
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [savedSuccessfullyMessage, setSavedSuccessfullyMessage] = useState('');

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        setSubmissionErrorMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSavePlaylistToSpotify();
        }
    };

    const handleSavePlaylistToSpotify = () => {
        if (!playlistTitle && (playlistTracks.length === 0)) {
            setSubmissionErrorMessage('Please add tracks and playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (playlistTracks.length === 0) {
            setSubmissionErrorMessage('Please add tracks to playlist before saving');
       
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (!playlistTitle) {
            setSubmissionErrorMessage('Please add playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };

        // Add to playlist
        const tracksInfo = addToPlaylist(playlistTitle, playlistTracks);
        if (tracksInfo) {
            setSavedSuccessfullyMessage(`${playlistTitle} saved successfully!`);

            // Clear message aftrer 5 seconds
            setTimeout(() => {
                setSavedSuccessfullyMessage('');
            }, 5000);

            return;
        };
    };
    
    return (
        <>
            {submissionErrorMessage && <p>{submissionErrorMessage}</p>}
            {/* Display success message if playlist saved successfully */}
            {savedSuccessfullyMessage && <p>{savedSuccessfullyMessage}</p>}
            
            <TableContainer
                bg='#FFFFFF'
                color='#0F062C'
                borderRadius={13}
                overflowX='auto'
                overflowY='auto'
                mb='10'
                px='10'
                pb='10'
                w='65rem'
                h='25rem'
            >
                <Table variant='simple' size='sm'>
                    <TableCaption placement='top'>
                        <Heading as='h4' size='md' pb={2}>Playlist</Heading>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>
                                <Heading as='h6' size='xs'>Album Artwork</Heading>
                            </Th>
                            <Th>
                                <Heading as='h6' size='xs'>Song</Heading>
                            </Th>
                            <Th>
                                <Heading as='h6' size='xs'>Artist</Heading>
                            </Th>
                            <Th>
                                <Heading as='h6' size='xs'>Album</Heading>
                            </Th>
                            <Th>
                                <Heading as='h6' size='xs'>Remove</Heading>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {playlistTracks.map((item) => (
                        <Tr key={item.id}>
                            <Td><img src={`${item.album.images[2].url}`} alt='album artwork' /></Td>
                            <Td>{item.name}</Td>
                            <Td>{item.artists[0].name}</Td>
                            <Td>{item.album.name}</Td>
                            <Td>
                                <Button onClick={() => removeSearchResultFromPlaylist(item)}>
                                    <Icon as={FiMinus} />
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Input 
                type='text'
                id='playlistInput'
                value={playlistTitle}
                onChange={handlePlaylistTitleChange}
                onKeyDown={handleKeyDown}
                required
                placeholder='Playlist name'
                autoComplete='off'
                size='md'
                bg='#FFFFFF'
                color='#0F062C'
                variant='outline'
                focusBorderColor='#D9D9D9'
                w='15rem'
                mb='5'
            ></Input>
            <Button
                justify='center'
                mt={7}
                bg='#1DB954'
                color='#191414'
                _hover={{
                    bg: '#1CB050'
                }}
                _active={{
                    bg: '#15843C'
                }}
                size='lg'
                onClick={handleSavePlaylistToSpotify}
            >
                Save Playlist
            </Button>
        </>
    )
}
