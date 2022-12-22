import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import CreateNote from "./pages/CreateNote";
import MyGoals from "./pages/MyGoals";
import MyNotes from "./pages/MyNotes";
import Note from "./pages/Note"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/my-goals" element={<MyGoals />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/note/:noteId" element={<Note />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
