import React, { useState, useEffect } from 'react';

export default function List() {
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [read, setRead] = useState('No');
  const [booksArr, setBooksArr] = useState([]);
  const [readUpdate, setReadUpdate] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (bookName && bookAuthor) {
      const newBook = {
        bookName,
        bookAuthor,
        read,
      };
      localStorage.setItem('books', JSON.stringify([...booksArr, newBook]));
      setBooksArr([...booksArr, newBook]);
    }
  };

  const removeBook = (index) => {
    if (booksArr) {
      const newArray = booksArr.filter((book, bookIndex) => {
        return bookIndex !== index;
      });

      localStorage.setItem('books', JSON.stringify(newArray));
      setBooksArr(newArray);
    }
  };

  const saveLocal = () => {
    localStorage.setItem('books', JSON.stringify(booksArr));
  };

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) setBooksArr(JSON.parse(storedBooks));
  }, []);

  return (
    <div>
      <form className="bookForm" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="bookName">Book Title</label>
        <input
          id="bookName"
          name="bookName"
          type="text"
          placeholder="Book Title"
          maxLength="40"
          onChange={(e) => setBookName(e.target.value)}
          required
        ></input>
        <label htmlFor="bookAuthor">Author</label>
        <input
          id="bookAuthor"
          name="bookAuthor"
          type="text"
          placeholder="Book Author"
          maxLength="30"
          onChange={(e) => setBookAuthor(e.target.value)}
          required
        ></input>
        <label>Read</label>
        <select
          id="read"
          name="read"
          value={read}
          onChange={(e) => setRead(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input id="submit" type="submit" value="ADD NEW BOOK"></input>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Finished (Yes/No)</th>
            <th colSpan="2">Settings</th>
          </tr>
          {booksArr
            ? booksArr.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.bookName}</td>
                    <td>{item.bookAuthor}</td>
                    <td>{item.read}</td>
                    <td id="settings">
                      <button
                        onClick={() => {
                          item.read === 'Yes'
                            ? (item.read = 'No')
                            : (item.read = 'Yes');
                          saveLocal();
                          setReadUpdate(!readUpdate);
                        }}
                      >
                        {item.read === 'Yes' ? 'Still reading' : 'Finished'}
                      </button>

                      <button onClick={() => removeBook(index)}>Remove</button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
