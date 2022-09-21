import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";

const NoteEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(editorState.values);

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default NoteEditor;
