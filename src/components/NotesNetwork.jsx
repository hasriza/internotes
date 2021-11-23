import { Button, Divider, Modal, message } from "antd";
import { useEffect, useState } from "react";

import { Graph } from "react-d3-graph";
import { fuseSearch } from "../helpers/fuseHelper";
import { graphConfig } from "../helpers/graphConfig";
import { stopWords } from "../helpers/stopWords";

let orgNotes;
let tempGraph = { nodes: [], links: [] };

const NotesNetworkComponent = (props) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const [showInfo, setShowInfo] = useState(false);
  const [modalText, setModalText] = useState("");
  const [noteToShow, setNoteToShow] = useState();

  const graphGenerator = (noteItem) => {
    tempGraph.nodes.push({ id: noteItem.key, name: noteItem.title });
    orgNotes.splice(
      orgNotes.findIndex((el) => el.key === noteItem.key),
      1
    );

    const titleContent = (noteItem.title + " " + noteItem.content).split(" ");
    const tagsProcessed = noteItem.tags.replace(" ", "").split(",");

    let filterWordsArr = titleContent.filter((el) => !stopWords.includes(el));
    filterWordsArr.push(...tagsProcessed);

    const uniqueWords = [...new Set(filterWordsArr)];

    let searchString = "";
    uniqueWords.forEach((el, index) => (searchString += index === 0 ? el : " " + el));

    const result = fuseSearch(searchString, ["title", "content", { name: "tags", weight: 2 }], orgNotes);
    console.log(result);

    if (result.length) {
      result.forEach((resultItem) => {
        if (
          !tempGraph.links.find(
            (graphItem) => graphItem.source === resultItem.item.key && graphItem.target === noteItem.key
          )
        ) {
          tempGraph.links.push({ source: noteItem.key, target: resultItem.item.key });
        }
      });
      result.forEach((resultItem) => {
        if (!tempGraph.nodes.find((graphItem) => graphItem.id === resultItem.item.key)) {
          return graphGenerator(resultItem.item);
        }
      });
    }

    return tempGraph;
  };

  useEffect(() => {
    orgNotes = [...props.allNotes];
    tempGraph = { nodes: [], links: [] };
    setGraphData(() => graphGenerator(props.selectedNote));
  }, []);

  const onClickNode = function (nodeId) {
    message.info("Double Click on node to open...");
  };

  const onDoubleClickNode = function (nodeId) {
    const nodeItem = props.allNotes.find((el) => el.key === nodeId);
    setNoteToShow(nodeItem);
    setModalText(`Would you like to visit Note: ${nodeItem.title}?`);
    setShowInfo(true);
  };

  return (
    <div>
      <Button
        style={{ float: "left", top: "2%", left: "5%", position: "absolute" }}
        onClick={() => props.showNotes(props.selectedNote)}
        ghost
        type="primary"
      >
        Go to Note: &nbsp;<span style={{ fontWeight: 700 }}>{props.selectedNote.title}</span>
      </Button>
      <Divider orientation="center">
        <h3>Network of {props.selectedNote.title}</h3>
      </Divider>
      <Graph
        id="notesNetwork"
        data={graphData}
        config={graphConfig}
        onDoubleClickNode={onDoubleClickNode}
        onClickNode={onClickNode}
      />

      <Modal
        visible={showInfo}
        title="Title"
        onOk={() => props.showNotes(noteToShow)}
        onCancel={() => setShowInfo(false)}
        footer={[
          <Button key="back" onClick={() => setShowInfo(false)}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={() => props.showNotes(noteToShow)}>
            Yes
          </Button>,
        ]}
      >
        {modalText}
      </Modal>
    </div>
  );
};

export default NotesNetworkComponent;
