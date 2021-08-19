const { nanoid } = require('nanoid');
const books = require('./books');


const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = books.findIndex((book) => book.id === id);
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;

  
};


const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author,summary ,publisher,pageCount,readPage,reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (name == undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  
  }

  if (readPage  > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  
  }



  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,

      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];


  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
        
        
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
 
};

const getAllBooksHandler = (request, h) => {

  const newBooks = books.map(item => {
    const container = {};

    container['id'] = item.id;
    container['name'] = item.name;
    container['publisher'] = item.publisher;
    return container;
})

  if (request.query.reading != undefined){
    
    var filterReading = books.reduce(function(filtered, field) {

      if (field.reading == true && request.query.reading ==1 ) {
         var data = { id: field.id , name: field.name , publisher : field.publisher  }
         filtered.push(data);
      }

      if (field.reading == false  && request.query.reading == 0) {
        var data = { id: field.id , name: field.name , publisher : field.publisher  }
        filtered.push(data);
     }
      return filtered;
    }, []);
    
    const response = h.response({
      status: 'success',
      data: {
        books : filterReading
    
      },
    });
    return response;
  }


  const response = h.response({
    status: 'success',
    data: {
      books : newBooks
  
    },
  });
  return response;

}

const addBookshelf  =  (request, h) => {

  const {
    name,year,author, summary, 
    publisher, pageCount,readPage, reading
  } = request.payload;

  const id = nanoid(16);
  const finished =  pageCount == readPage? true: false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newbook = {
    id, name,year,author, summary, 
    publisher, pageCount,readPage, finished, reading,insertedAt,updatedAt,

  };

  
  if (name == undefined || name == ""){
    const response = h.response({
      status: 'fail',
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });
    response.code(400);
    return response;

  }

  if (readPage  > pageCount){
    const response = h.response({
      status: 'fail',
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
    return response;
  
  }



  books.push(newbook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId : id,
        name : name,
        year : year,
        author : author,
        summary : summary,
        publisher : publisher,
        pageCount : pageCount,
        readPage : readPage,
        finished : finished,
        reading : reading,
        insertedAt : insertedAt,
        updatedAt : updatedAt

      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(400);
  return response;

}

module.exports = {deleteBookByIdHandler,editBookByIdHandler, getBookByIdHandler,getAllBooksHandler,addBookshelf };
