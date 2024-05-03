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
    Icon
  } from '@chakra-ui/react';

export default function SearchResults({ searchData, addSearchResultToPlaylist }) {
    return (
        <>
            <TableContainer
                bg='#FFFFFF'
                color='#0F062C'
                borderRadius={13}
                overflowX='auto'
                overflowY='auto'
                mb='50'
                px='10'
                pb='10'
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
        </>
    );
}
