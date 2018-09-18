import React, { Component } from 'react'

class BookCard extends Component {

  
  render() {
    return (
      <div>
        <img src={this.props.book.cover_src} alt="book cover" />
        <p>{this.props.book.title}</p>
        <button>Transfer</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default BookCard