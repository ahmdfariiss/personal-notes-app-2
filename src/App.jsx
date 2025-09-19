import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/Archivepage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddNotePage from "./pages/AddNotePage";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import {
  getAllNotes,
  getNote,
  getActiveNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./utils/local-data";

function App() {
  // agar trigger re-render setelah operasi CRUD
  const [version, setVersion] = useState(0);

  const refresh = () => setVersion((v) => v + 1);

  const context = {
    getAllNotes,
    getNote,
    getActiveNotes,
    getArchivedNotes,
    addNote: (data) => {
      addNote(data);
      refresh();
    },
    deleteNote: (id) => {
      deleteNote(id);
      refresh();
    },
    archiveNote: (id) => {
      archiveNote(id);
      refresh();
    },
    unarchiveNote: (id) => {
      unarchiveNote(id);
      refresh();
    },
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage context={context} key={version} />}
          />
          <Route
            path="/archives"
            element={<ArchivePage context={context} key={version} />}
          />
          <Route
            path="/notes/new"
            element={<AddNotePage context={context} />}
          />
          <Route
            path="/notes/:id"
            element={<NoteDetailPage context={context} key={version} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
