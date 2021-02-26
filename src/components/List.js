import React from "react";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: "",
      bookName: "",
      read: "No",
      books: [],
    };
  }

  changeHandler = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const bookNameVal = this.state.bookName;
    const bookAuthorVal = this.state.bookAuthor;
    const readVal = this.state.read;
    if (bookNameVal && bookAuthorVal) {
      this.setState(
        (prevState) => ({
          books: [
            ...prevState.books,
            {
              bookName: bookNameVal,
              bookAuthor: bookAuthorVal,
              read: readVal,
            },
          ],
        }),
        () => {
          localStorage.setItem("books", JSON.stringify(this.state.books));
        }
      );
    }
  };

  removeBook = (index) => {
    const booksArr = [...this.state.books];
    if (booksArr) {
      this.setState(
        {
          books: booksArr.filter((book, bookIndex) => {
            return bookIndex !== index;
          }),
        },
        () => {
          localStorage.setItem("books", JSON.stringify(this.state.books));
        }
      );
    }
  };

  saveLocal = () => {
    localStorage.setItem("books", JSON.stringify(this.state.books));
  };

  componentDidMount() {
    const books = localStorage.getItem("books");
    if (books) this.setState({ books: JSON.parse(books) });
  }

  render() {
    let books = this.state.books;
    return (
      <div>
        <form className="bookForm" onSubmit={this.submitHandler}>
          <lablel for="bookName">Book Title</lablel>
          <input
            id="bookName"
            name="bookName"
            type="text"
            placeholder="Book Title"
            maxLength="40"
            onChange={this.changeHandler}
            required
          ></input>
          <label for="bookAuthor">Author</label>
          <input
            id="bookAuthor"
            name="bookAuthor"
            type="text"
            placeholder="Book Author"
            maxLength="30"
            onChange={this.changeHandler}
            required
          ></input>
          <label>Read</label>
          <select
            id="read"
            name="read"
            onChange={this.changeHandler}
            value={this.state.read}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input id="submit" type="submit" value="ADD NEW BOOK"></input>
        </form>
        <table>
          <tr>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Finished (Yes/No)</th>
            <th colSpan="2">Settings</th>
          </tr>
          {books.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.bookName}</td>
                <td>{item.bookAuthor}</td>
                <td>{item.read}</td>
                <td id="settings">
                  <button
                    onClick={() => {
                      item.read === "Yes"
                        ? (item.read = "No")
                        : (item.read = "Yes");
                      this.saveLocal();
                      this.forceUpdate();
                    }}
                  >
                    {item.read === "Yes" ? "Still reading" : "Finished"}
                  </button>

                  <button
                    onClick={() => {
                      this.removeBook(index);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
