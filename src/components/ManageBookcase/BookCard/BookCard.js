import React, { Component } from 'react'
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

class BookCard extends Component {
  handleCardAction = () => {
    this.props.handleBookOpen(this.props.book);
  }

  render() {
    return (
      <Card style={{ margin: '2em', width: '215px', height: '330px' }}>
        <CardActionArea onClick={this.handleCardAction}>
          <CardMedia
            image={this.props.book.cover_src}
            title={this.props.book.title}
            style={{ height: '330px', width: '215px' }}
          />
        </CardActionArea>
      </Card>
    )
  }
}

export default BookCard