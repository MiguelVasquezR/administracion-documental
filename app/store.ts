import { configureStore } from "@reduxjs/toolkit";

import books from "@/redux/books";
import movies from "@/redux/movies";
import user from "@/redux/usuario";
import prestamos from "@/redux/prestamos";

export default configureStore({
  reducer: { books, movies, user, prestamos },
});
