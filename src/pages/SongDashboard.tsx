import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Container } from '@mui/system';
import { Form } from '../components/Form';
import { Button, Grid } from '@mui/material';

const SONGS = gql`
  query Query {
    Songs {
      id
      title
      artist
      genre {
        name
      }
    }
  }
`

const REMOVE_SONG = gql`
  mutation RemoveSong($removeSongId: Int!) {
    removeSong(id: $removeSongId) {
      id
    }
  }
`

export const SongDashboard = () => {
  const { loading, error, data } = useQuery(SONGS)
  const [removeSong] = useMutation(REMOVE_SONG)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (data) {
      setSongs(data.Songs);
    }
  }, [data]);

  const handleRemoveSong = (songId: number) => {
    setSongs(songs.filter((song: any) => parseInt(song.id) !== songId));
    removeSong({ variables: { removeSongId: songId } });
  }

  const handleEditSong = (songId: number) => {
    console.log(songId);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Grid container>
        <Grid columns={8}>
          {songs.map((song: any) => (
            <div key={song.title}>
              <p>
                {song.title}: {song.artist} - {song.genre.name}
              </p>
              <Button color="error" onClick={() => handleRemoveSong(parseInt(song.id))}>Remove</Button>
              <Button style={{ marginLeft: 10 }} onClick={() => handleEditSong(parseInt(song.id))}>Edit</Button>
            </div>
          ))}
        </Grid>
        <Grid columns={8}>
          <Form />
        </Grid>
      </Grid>
    </Container>
  )
};
