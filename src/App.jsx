import "./App.css";

import { Button, Col, Input, Row } from "antd";
import { getNotes, setNotes } from "./helpers/notesManager";

import NotesComponent from "./components/NotesComponent";
import NotesNetworkComponent from "./components/NotesNetwork";
import { PlusSquareOutlined } from "@ant-design/icons";
import TableComponent from "./components/TableComponent";
import { fuseSearch } from "./helpers/fuseHelper";
import { useState } from "react";

const App = () => {
  const [orgNotes, setOrgNotes] = useState(getNotes());
  const [filteredNotes, setFilteredNotes] = useState(getNotes());
  const [selectedNote, setSelectedNote] = useState();

  const [showNetwork, setShowNetwork] = useState(false);

  const onSearch = (value) => {
    const result = fuseSearch(value, ["title", "date", "content", { name: "tags", weight: 2 }], orgNotes);
    setFilteredNotes(result.map((notesObj) => notesObj.item));
  };

  const addNewNote = () => {
    setShowNetwork(false);
    setSelectedNote(null);
  };

  const onSaveNote = (data) => {
    let oldNoteIndex = orgNotes.findIndex((el) => el.key === data.key);

    const tempNotes = orgNotes;

    if (oldNoteIndex >= 0) {
      tempNotes[oldNoteIndex] = data;
    } else {
      tempNotes.push(data);
      oldNoteIndex = tempNotes.length - 1;
    }
    setSelectedNote(tempNotes[oldNoteIndex]);
    setNotes(tempNotes);
    setOrgNotes(tempNotes);
    setFilteredNotes(tempNotes);
  };

  const onNoteClick = (record) => {
    setShowNetwork(false);
    setSelectedNote(record);
  };

  const deleteNote = (record) => {
    setTimeout(() => {
      setSelectedNote(orgNotes[0] ? orgNotes[0] : null);
    }, 100);
    const tempFilter = orgNotes.filter((notesObj) => notesObj.key !== record.key);
    setNotes(tempFilter);
    setFilteredNotes(tempFilter);
    setOrgNotes(tempFilter);
  };

  return (
    <div className="App">
      <header className="App-header">InterNotes</header>
      <Row>
        <Col span={7}>
          <div className="leftHandSection">
            <Input.Search
              placeholder="Find something..."
              allowClear
              enterButton
              size="large"
              onSearch={onSearch}
              className="leftHandItems"
              onChange={(e) => {
                if (e.target.value === "") setFilteredNotes(orgNotes);
              }}
            />
            <Button
              onClick={addNewNote}
              type="primary"
              shape="round"
              icon={<PlusSquareOutlined />}
              size="large"
              className="leftHandItems"
            >
              Add new Note
            </Button>
            <TableComponent notes={filteredNotes} deleteNote={deleteNote} noteClicked={onNoteClick} />
          </div>
        </Col>
        <Col span={17}>
          <div className="rightHandItems">
            {showNetwork ? (
              <NotesNetworkComponent
                showNotes={(note) => {
                  onNoteClick(note);
                }}
                selectedNote={selectedNote}
                allNotes={getNotes()}
              />
            ) : (
              <NotesComponent
                noteData={selectedNote}
                saveNote={onSaveNote}
                newKey={filteredNotes.length ? (parseInt(filteredNotes.at(-1).key) + 1).toString() : "1"}
                showNetwork={() => setShowNetwork(true)}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
