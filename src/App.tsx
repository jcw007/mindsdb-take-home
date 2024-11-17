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
    children: [
      {
        name: "cryptocurrency_forecast_model",
        schema: null,
        class: "table",
        type: "model",
        engine: "lightwood",
        deletable: true,
      },
      {
        name: "cryptocurrency_forecast_model_1",
        schema: null,
        class: "table",
        type: "model",
        engine: "lightwood",
        deletable: true,
      },
      {
        name: "btcusdt_recent_view",
        schema: null,
        class: "table",
        type: "view",
        engine: null,
        deletable: true,
      },
      {
        name: "btcusdt_recent_view_1",
        schema: null,
        class: "table",
        type: "view",
        engine: null,
        deletable: true,
      },
      {
        name: "agent_1",
        schema: null,
        class: "table",
        type: "agent",
        engine: null,
        deletable: true,
      },
      {
        name: "agent_2",
        schema: null,
        class: "table",
        type: "agent",
        engine: null,
        deletable: true,
      },
    ],
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
    children: [
      {
        name: "raw_llm_usage_data",
        class: "schema",
        deletable: false,
        children: [
          {
            name: "users",
            class: "table",
            type: "table",
            engine: null,
            deletable: false,
          },
          {
            name: "llm_agents_requests_by_date",
            class: "table",
            type: "table",
            engine: null,
            deletable: false,
          },
          {
            name: "llm_requests_by_date",
            class: "table",
            type: "table",
            engine: null,
            deletable: false,
          },
          {
            name: "llm_agents_by_date",
            class: "table",
            type: "table",
            engine: null,
            deletable: false,
          },
        ],
      },
    ],
  },
];
