import React, { Component } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

class BookCard extends Component {
  render() {
    return (
      <Card style={{margin: '2em'}}>
        <CardActionArea>
          <CardMedia
            image={this.props.book.cover_src}
            title={this.props.book.title}
            style={{height: '300px', width: '225px'}}
          />
        </CardActionArea>
        <CardActions>
          <Button size="small">
            Delete
        </Button>
        </CardActions>
      </Card>
    )
  }
}

export default BookCard