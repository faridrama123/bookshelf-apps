
const {deleteBookByIdHandler,editBookByIdHandler, getBookByIdHandler,getAllBooksHandler,addBookshelf  } = require('./handler');

const routes = [


  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
  

  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  {
    method: 'POST',
    path: '/books',
    handler: addBookshelf,
  },


  ];
   
  module.exports = routes;