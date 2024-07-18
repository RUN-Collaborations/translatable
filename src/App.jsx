import { useState } from 'react';
import AppLayout from './components/AppLayout';
import SimpleEditorPrint from './components/SimpleEditorPrint';
import UsfmFileEditor from './components/UsfmFileEditor';
import { Routes, Route } from "react-router-dom"
import './App.css' // not in use?

function App() {
  const [sectionIndex, setSectionIndex] = useState(1);
  const [reference, setReference] = useState({ bookId: undefined, chapter: 1, verse: undefined });
  // const [align, setAlign] = useState(true);

  const initialFile = { name: undefined, content: undefined, lastModified: undefined };
  const initialFiles = { original: initialFile, bridge: initialFile, target: initialFile };
  const [files, setFiles] = useState(initialFiles);

  // const onAlign = () => { setAlign(!align); };
  
  const onFile = ({ file, type }) => {
    const myfiles = { ...files };
    myfiles[type] = file;
    setFiles(myfiles);
  };

  const editorProps = {
    sectionIndex,
    onSectionIndex: setSectionIndex,
    reference,
    onReference: setReference,
    onFile,
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <AppLayout/> } />
        <Route path="print" element={ <SimpleEditorPrint /> } />
        <Route path="usfm" element={ <UsfmFileEditor {...editorProps} file={files.target} type="target" /> } />
      </Routes>
    </div>
  );
}

export default App
