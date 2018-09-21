import React, { Component } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

class BookCard extends Component {
  render() {
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            image={this.props.book.cover_src}
            title={this.props.book.title}
            style={{height: '200px', width: '150px'}}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.book.title}
          </Typography>
            <Typography component="p">
              Author: {this.props.book.author}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">
            Edit
        </Button>
          <Button size="small">
            Delete
        </Button>
        </CardActions>
      </Card>
    )
  }
}

export default BookCard