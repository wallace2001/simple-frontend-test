import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from "../reducers/home.actions";
import { InputBase, Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';

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
  const [valueInput, setValueInput] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSearch = (e) => {
    setValueInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.loadUsers.request({name: valueInput}));
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Pesquisar..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
      />
      <IconButton onClick={onSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;