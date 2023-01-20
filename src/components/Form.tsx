import React from 'react'
import { Container } from '@mui/system';
import { TextField, Button } from '@mui/material'
import { useQuery, gql, useMutation } from '@apollo/client'

const CREATE_SONG = gql`
  mutation Mutation($title: String!, $artist: String!, $genreId: Int!) {
    createSong(title: $title, artist: $artist, genreId: $genreId) {
      title
      artist
      genreId
    }
  }
`

export const Form = () => {
  const [songName, setSongName] = React.useState('')
  const [artistName, setArtistName] = React.useState('')
  const [genre, setGenre] = React.useState('')

  const [createSong] = useMutation(CREATE_SONG);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(songName, artistName, genre)
    createSong({ variables: { title: songName, artist: artistName, genreId: parseInt(genre) } });
  }

  return (
    <form style={{ marginLeft: 50 }} onSubmit={handleSubmit}>
      <h3>Add / Edit form</h3>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Song name"
        variant="outlined"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Artist name"
        variant="outlined"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        style={{ marginTop: 20 }}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Genre"
        variant="outlined"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginTop: 20 }}
      />
      <Button fullWidth variant='contained' type="submit" style={{ marginTop: 20 }}>Submit</Button>
    </form>
  )
}