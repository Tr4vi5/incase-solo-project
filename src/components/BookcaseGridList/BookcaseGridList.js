import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '50px',
    },
    gridList: {
        width: 500,
        height: 600,
        position: 'relative'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

const mapStateToProps = state => ({
    user: state.user,
});

class TitlebarGridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theseBooks: [],
            open: false,
            currentBook: '',
        }
    }

    componentDidMount() {
        this.getTheseBooks();
    }

    handleOpen = (book) => {
        this.setState({
            open: true,
            currentBook: book
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleMessageRequest = () => {
        console.log(this.state.currentBook)
        alert(`Are you sure that you want to request ${this.state.currentBook.title}?`);
        axios({
            method: 'POST',
            url: '/api/requests',
            data: this.state.currentBook
        }).then((response) => {
            console.log('Back from new request POST', response.data);
            this.setState({
                open: false
            })
        }).catch((error) => {
            console.log('Unable to post new request', error);
            alert('Sorry, could not post new request, please try again later');
        });
    }

    getTheseBooks = () => {
        axios({
            method: 'GET',
            url: `/api/books/user/${this.props.bookcase.id}`
        }).then((response) => {
            this.setState({
                theseBooks: response.data
            })
        }).catch((error) => {
            console.log('Error getting these books', error);
        })
    }



    render() {
        let bookListContent;
        const { classes } = this.props;

        if (this.props.bookcase) {
            bookListContent = (
                <div className={classes.root}>
                    <GridList cellHeight={300} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto', backgroundColor: '#222', display: 'inline' }}>
                            <ListSubheader component="div" style={{ color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '5px' }}><Avatar src={this.props.bookcase.profile_img_src} />  {this.props.bookcase.username}</ListSubheader>
                        </GridListTile>

                        {this.state.theseBooks.map((book, index) => (
                            <GridListTile key={index}>
                                <img src={book.cover_src} alt={book.title} />
                                <GridListTileBar
                                    title={book.title}
                                    subtitle={<span>by: {book.author}</span>}
                                    actionIcon={
                                        <IconButton className={classes.icon} onClick={() => this.handleOpen(book)}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            )
        } else {
            bookListContent = null;
        }

        return (
            <div>
                {bookListContent}
                <Dialog
                    open={this.state.open}
                >
                    <div style={{ padding: '10px', backgroundColor: 'white'}}>
                        <img src={this.state.currentBook.cover_src} alt='Cover' style={{ height: '200px', width: '150px', float: 'right'}} />
                        <h2>{this.state.currentBook.title}</h2>
                        <h4>{this.state.currentBook.author}</h4>
                        <p>Published: {this.state.currentBook.release_year}</p>
                        <p>Genre: {this.state.currentBook.genre}</p>
                        <p>{this.state.currentBook.synopsis}</p>
                        <p>ISBN-13: {this.state.currentBook.isbn}</p>
                        <Button type="submit" variant="contained" color="primary" onClick={this.handleMessageRequest}>
                            Request Book
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const BookcaseGridList = withStyles(styles)(TitlebarGridList)

export default connect(mapStateToProps)(BookcaseGridList);