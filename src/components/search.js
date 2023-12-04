import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 400,
    marginTop: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  const handleSearch = (e) => {
    console.log('Pesquisar:', e.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Pesquisar..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;