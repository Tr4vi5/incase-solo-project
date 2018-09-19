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
              Author:
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </CardActions>
      </Card>
    )
  }
}

export default BookCard