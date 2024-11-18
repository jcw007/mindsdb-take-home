import TreeView, { TreeNode } from "./components/TreeView";

import "./App.css";

function App() {
  return (
    <div className="border font-mono">
      <TreeView data={data} />
    </div>
  );
}

export default App;

const data: TreeNode[] = [
  {
    name: "information_schema",
    class: "db",
    type: "system",
    engine: null,
    deletable: false,
    visible: true,
  },
  {
    name: "log",
    class: "db",
    type: "system",
    engine: null,
    deletable: false,
    visible: true,
  },
  {
    name: "mindsdb",
    class: "db",
    type: "project",
    engine: null,
    deletable: false,
    visible: true,
    hasChildren: true,
  },
  {
    name: "files",
    class: "db",
    type: "data",
    engine: "files",
    deletable: false,
    visible: true,
  },
  {
    name: "datasources",
    class: "db",
    type: "data",
    engine: "web",
    deletable: false,
    visible: true,
    hasChildren: true,
  },
];
