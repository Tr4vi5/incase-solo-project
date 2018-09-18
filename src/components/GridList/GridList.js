import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});



const tileData = [
    {
        img: 'image',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'image',
        title: 'Image',
        author: 'author',
    },
];




class TitlebarGridList extends Component {
    constructor(props){
        super(props);
        this.state={
            theseBooks: []
        }
    }

    componentDidMount(){
        this.getTheseBooks();
    }

    getTheseBooks = () => {
        axios({
            method:'GET',
            url: `/api/books/user/${this.props.bookcase.id}`
        }).then((response)=>{
            this.setState({
                theseBooks: response.data
            })
        }).catch((error)=>{
            console.log('Error getting these books', error);
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">{this.props.bookcase.username}</ListSubheader>
                    </GridListTile>
                    {this.state.theseBooks.map((book, index) => (
                        <GridListTile key={index}>
                            <img src={book.cover_src} alt={book.title} />
                            <GridListTileBar
                                title={book.title}
                                subtitle={<span>by: {book.author}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon} onClick={this.getTheseBooks}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);