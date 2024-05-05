import React from 'react';
import { FiPlus } from "react-icons/fi";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Heading,
    Button,
    Icon,
    Box
  } from '@chakra-ui/react';

export default function SearchResults({ searchData, addSearchResultToPlaylist }) {
    return (
        <>
            <Box bg='white' borderRadius={13} overflowX='hidden' overflowY='hidden'>
                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowX='auto'
                    overflowY='auto'
                    borderRadius={13}
                    px='10'
                    w='65rem'
                    h='25rem'
                >
                    <Table variant='simple' size='sm'>
                        <TableCaption placement='top'>
                            <Heading as='h4' size='md' pb={2}>Search Results</Heading>
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
                                    <Heading as='h6' size='xs'>Add</Heading>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {searchData.map((result) => (
                            <Tr key={result.id}>
                                <Td><img src={`${result.album.images[2].url}`} alt='album artwork' /></Td>
                                <Td>{result.name}</Td>
                                <Td>{result.artists[0].name}</Td>
                                <Td>{result.album.name}</Td>
                                <Td>
                                    <Button onClick={() => addSearchResultToPlaylist(result)}>
                                        <Icon as={FiPlus} />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                
                <Box border='1px' borderTop borderBottom borderColor='D9D9D9' h='5'></Box>

                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowX='auto'
                    overflowY='auto'
                    borderRadius={13}
                    px='10'
                    w='65rem'
                    h='25rem'
                >
                    <Table variant='simple' size='sm'>
                        <TableCaption placement='top'>
                            <Heading as='h4' size='md' pb={2}>Search Results</Heading>
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
                                    <Heading as='h6' size='xs'>Add</Heading>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {searchData.map((result) => (
                            <Tr key={result.id}>
                                <Td><img src={`${result.album.images[2].url}`} alt='album artwork' /></Td>
                                <Td>{result.name}</Td>
                                <Td>{result.artists[0].name}</Td>
                                <Td>{result.album.name}</Td>
                                <Td>
                                    <Button onClick={() => addSearchResultToPlaylist(result)}>
                                        <Icon as={FiPlus} />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
