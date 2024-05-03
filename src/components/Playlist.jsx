import React, { useState } from 'react';
import { addToPlaylist } from '../spotify/httpRequests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Tfoot,
    Button
  } from '@chakra-ui/react';

export default function Playlist({ playlistTracks, removeSearchResultFromPlaylist }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
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
            
            <TableContainer bg='#FFFFFF' color='#0F062C' borderRadius={13} overflowX='auto' overflowY='auto' mb={10} px='10' pb='10'>
                <Table variant='simple' size='sm'>
                    <TableCaption placement='top'>
                        <form>
                            <input
                                type='text'
                                id='playlistInput'
                                value={playlistTitle}
                                onChange={handlePlaylistTitleChange}
                                onKeyDown={handleKeyDown}
                                required
                                placeholder='Give playlist a name'
                                autoComplete='off'
                            />
                        </form>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Album Artwork</Th>
                            <Th>Artist</Th>
                            <Th>Song</Th>
                            <Th>Album</Th>
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
                                <button onClick={() => removeSearchResultFromPlaylist(item)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                    <Tfoot>
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
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}
