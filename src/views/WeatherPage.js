import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import * as api from '../services/api';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: '', searchQuery: '', city: null};
    
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    handleSearchTextChange(event) {
        this.setState({searchText: event.target.value});
    }

    async onSearchSubmit() {
        const city = await api.getCityByLocationName(this.state.searchText);
        this.setState({searchQuery: this.state.searchText, city});
    }
    
    handleSearchClick() {
        this.onSearchSubmit();
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            this.onSearchSubmit();
        }
    }

    render() {
        return (
            <React.Fragment>
              <CssBaseline />

                <AppBar position="static" variant="outlined">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: 'flex' }}
                        >
                            Погода
                        </Typography>
                    </Toolbar>
                </Container>


                </AppBar>

                <Container maxWidth="md">
                    <Box sx={{ my: 2 }}>
                        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                label="Поиск"
                                onKeyPress={this.onKeyUp}
                                value={this.state.searchText}
                                onChange={this.handleSearchTextChange}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={this.handleSearchClick}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>

                        {this.state.searchQuery.trim().length > 0 &&
                            <Alert variant="outlined" severity="info" sx={{ my: 1 }}>
                                Результаты по запросу: <b>{this.state.searchQuery}</b>
                            </Alert>
                        }

                        {this.state.city && 
                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/bg.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {this.state.city.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Card>
                        }
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}
