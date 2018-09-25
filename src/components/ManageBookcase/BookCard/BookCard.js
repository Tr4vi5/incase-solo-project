import React, { Component } from 'react'
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

class BookCard extends Component {
  handleCardAction = () => {
    this.props.handleBookOpen(this.props.book);
  }

  render() {
    return (
      <Card style={{ margin: '2em', width: '186px', height: '310px' }}>
        <CardActionArea onClick={this.handleCardAction}>
          <CardMedia
            image={this.props.book.cover_src}
            title={this.props.book.title}
            style={{ height: '310px', width: '186px' }}
          />
        </CardActionArea>
      </Card>
    )
  }
}

export default BookCard