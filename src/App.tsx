import React, { useState, useRef, useEffect } from "react";
import { Graph } from "react-d3-graph";

import "./App.css";

interface node {
  id: string;
}

interface link {
  source: string;
  target: string;
}

interface StageData {
  addNodes?: string[];
  removeNodes?: string[];
  addLinks?: string[];
  removeLinks?: string[];
}
const stages: StageData[][] = [
  [
    {
      addNodes: ["Node 1", "Node 2"],
      addLinks: ["Node 1/Node 2"],
    },
    {
      addNodes: ["Node 3"],
      addLinks: ["Node 2/Node 3", "Node 1/Node 3"],
    },
  ],
  [
    {
      addNodes: [
        "CEO",
        "Head of HR",
        "Head of engineering",
        "Head of sales",
        "Salesman 1",
        "Salesman 2",
        "Salesman 3",
        "Salesman 4",
        "Sales intern",
        "Engineer 1",
        "Engineer 2",
        "Engineer 3",
        "HR manager",
        "Interviewer",
        "Compliance officer",
      ],
      addLinks: [
        "CEO/Head of HR",
        "CEO/Head of engineering",
        "CEO/Head of sales",
        "Head of sales/Salesman 1",
        "Head of sales/Salesman 2",
        "Head of sales/Salesman 3",
        "Head of sales/Salesman 4",
        "Salesman 1/Sales intern",
        "Head of engineering/Engineer 1",
        "Head of engineering/Engineer 2",
        "Head of engineering/Engineer 3",
        "Head of HR/HR manager",
        "Head of HR/Interviewer",
        "Head of HR/Compliance officer",
      ],
    },
  ],
  [
    {
      addNodes: ["John", "Sarah", "Lisa", "Steve", "Nilesh", "Pat"],
      addLinks: [
        "John/Sarah",
        "John/Steve",
        "John/Nilesh",
        "John/Pat",
        "Lisa/Sarah",
        "Lisa/Steve",
        "Nilesh/Steve",
        "Nilesh/Pat",
      ],
    },
    {
      addNodes: ["Simon"],
      addLinks: ["Simon/Steve"],
    },
    {
      addNodes: ["Lucy"],
      addLinks: ["Simon/Lucy"],
    },
    {
      addLinks: ["Lucy/Lisa"],
    },
    {
      removeNodes: ["Steve"],
      removeLinks: ["Lisa/Steve", "Nilesh/Steve", "John/Steve", "Simon/Steve"],
    },
  ],
  [
    {
      addNodes: ["Evil corporation", "Exploited workers"],
      addLinks: ["Evil corporation/Exploited workers"],
    },
  ],
  [
    {
      addNodes: ["Supermarket"],
    },
    {
      addNodes: ["Supplier"],
      addLinks: ["Supermarket/Supplier"],
    },
    {
      addNodes: ["Farmer"],
      addLinks: ["Supplier/Farmer"],
    },
    {
      addNodes: ["You"],
      addLinks: ["Supermarket/You"],
    },
    {
      addNodes: ["Shareholders"],
      addLinks: ["Shareholders/Supermarket"],
    },
    {
      addNodes: ["Supplier shareholders"],
      addLinks: ["Supplier shareholders/Supplier"],
    },
    {
      addNodes: ["Pension fund", "Investors"],
      addLinks: [
        "Pension fund/Shareholders",
        "Supplier shareholders/Investors",
      ],
    },
    {
      addNodes: ["CEO", "Buyers"],
      addLinks: ["Supermarket/CEO", "Supermarket/Buyers", "CEO/Buyers"],
    },
    {
      addNodes: ["Your bank"],
      addLinks: ["Your bank/Investors", "You/Pension fund", "You/Your bank"],
    },
  ],
  [
    {
      addNodes: [
        "Powerful person",
        "Person 1",
        "Person 2",
        "Person 3",
        "Person 4",
        "Person 5",
        "Person 6",
        "Person 7",
        "Person 8",
        "Person 9",
        "Person 10",
        "Person 11",
        "Person 12",
      ],
      addLinks: [
        "Powerful person/Person 1",
        "Powerful person/Person 2",
        "Powerful person/Person 3",
        "Powerful person/Person 4",
        "Powerful person/Person 5",
        "Powerful person/Person 6",
        "Powerful person/Person 7",
        "Powerful person/Person 8",
        "Powerful person/Person 9",
        "Powerful person/Person 10",
        "Powerful person/Person 11",
        "Powerful person/Person 12",
      ],
    },
  ],
  [
    {
      addNodes: ["Annemarie"],
    },
    {
      addNodes: ["Friend 1", "Friend 2", "Friend 3", "Friend 4"],
      addLinks: [
        "Annemarie/Friend 1",
        "Annemarie/Friend 2",
        "Annemarie/Friend 3",
        "Annemarie/Friend 4",
      ],
    },
    {
      addNodes: [
        "Stranger 1",
        "Stranger 2",
        "Stranger 3",
        "Stranger 4",
        "Stranger 5",
        "Stranger 6",
        "Stranger 7",
        "Stranger 8",
        "Stranger 9",
        "Stranger 10",
        "Stranger 11",
        "Stranger 12",
        "Stranger 13",
        "Stranger 14",
        "Stranger 15",
        "Stranger 16",
      ],
      addLinks: [
        "Friend 1/Stranger 1",
        "Friend 1/Stranger 2",
        "Friend 1/Stranger 3",
        "Friend 1/Stranger 4",
        "Friend 2/Stranger 5",
        "Friend 2/Stranger 6",
        "Friend 2/Stranger 7",
        "Friend 2/Stranger 8",
        "Friend 3/Stranger 9",
        "Friend 3/Stranger 10",
        "Friend 3/Stranger 11",
        "Friend 3/Stranger 12",
        "Friend 4/Stranger 13",
        "Friend 4/Stranger 14",
        "Friend 4/Stranger 15",
        "Friend 4/Stranger 16",
      ],
    },
  ],
  [
    {
      addNodes: ["You"],
    },
    {
      addNodes: ["Friend 1", "Friend 2", "Friend 3", "Friend 4"],
      addLinks: [
        "You/Friend 1",
        "You/Friend 2",
        "You/Friend 3",
        "You/Friend 4",
      ],
    },
    {
      addNodes: [
        "Stranger 1",
        "Stranger 2",
        "Stranger 3",
        "Stranger 4",
        "Stranger 5",
        "Stranger 6",
        "Stranger 7",
        "Stranger 8",
        "Stranger 9",
        "Stranger 10",
        "Stranger 11",
        "Stranger 12",
        "Stranger 13",
        "Stranger 14",
        "Stranger 15",
        "Stranger 16",
      ],
      addLinks: [
        "Friend 1/Stranger 1",
        "Friend 1/Stranger 2",
        "Friend 1/Stranger 3",
        "Friend 1/Stranger 4",
        "Friend 1/Stranger 5",
        "Friend 1/Stranger 6",
        "Friend 1/Stranger 7",
        "Friend 1/Stranger 9",
      ],
    },
    {
      addLinks: ["Friend 2/Stranger 8"],
    },
    {
      addLinks: [
        "Friend 3/Stranger 10",
        "Friend 3/Stranger 11",
        "Friend 3/Stranger 12",
        "Friend 4/Stranger 13",
        "Friend 4/Stranger 14",
        "Friend 4/Stranger 15",
        "Friend 4/Stranger 16",
      ],
    },
  ],
];

const convertNode = (node: string): node => ({ id: node });
const convertLink = (link: string): link => ({
  source: link.split("/")[0],
  target: link.split("/")[1],
});

interface GraphData {
  addNodes: node[];
  addLinks: link[];
  removeNodes: node[];
  removeLinks: link[];
}

const mapStageData = ({
  addNodes,
  removeNodes,
  addLinks,
  removeLinks,
}: StageData): GraphData => ({
  addNodes: (addNodes && addNodes.map(convertNode)) || [],
  removeNodes: (removeNodes && removeNodes.map(convertNode)) || [],
  addLinks: (addLinks && addLinks.map(convertLink)) || [],
  removeLinks: (removeLinks && removeLinks.map(convertLink)) || [],
});

const RenderNetwork = ({
  slideNum: slide,
  step,
}: {
  slideNum: number;
  step: number;
}) => {
  const currentStageData = useRef<GraphData>({
    addNodes: [],
    addLinks: [],
    removeNodes: [],
    removeLinks: [],
  });

  useEffect(() => {
    currentStageData.current = mapStageData(stages[slide][0]);
  }, [slide]);

  const [nodes, setNodes] = useState<node[]>(currentStageData.current.addNodes);
  const [links, setLinks] = useState<link[]>(currentStageData.current.addLinks);
  const [prevStep, setPrevStep] = useState(-1);
  const [prevSlide, setPrevSlide] = useState(-1);

  type ApplyChanges = (
    addNodes: node[],
    removeNodes: node[],
    addLinks: link[],
    removeLinks: link[]
  ) => void;
  const applyChanges: ApplyChanges = (
    addNodes,
    removeNodes,
    addLinks,
    removeLinks
  ) => {
    setNodes((prevNodes) => [
      ...prevNodes.filter(
        (node) => !removeNodes.find((otherNode) => node.id === otherNode.id)
      ),
      ...addNodes,
    ]);
    setLinks((prevLinks) => [
      ...prevLinks.filter(
        (link) =>
          !removeLinks.find(
            (otherLink) =>
              link.source === otherLink.source &&
              link.target === otherLink.target
          )
      ),
      ...addLinks,
    ]);
  };

  // TODO: should precompute all the data into separate steps and then simply go between them
  // this adding/removing gets too complex. only useful for data entry
  if (slide !== prevSlide) {
    // FIXME: always resets to step 1 of the slide, two parts of code changing step state, should always come as prop
    const { addNodes, addLinks } = mapStageData(stages[slide][0]);
    console.log("WILL ADD", slide, prevSlide, addLinks);
    setNodes(addNodes);
    setLinks(addLinks);
    setPrevSlide(slide);
  }

  console.log(links);

  if (step > prevStep && step > 0) {
    const { addNodes, removeNodes, addLinks, removeLinks } = mapStageData(
      stages[slide][step]
    );
    applyChanges(addNodes, removeNodes, addLinks, removeLinks);
  } else if (step < prevStep) {
    const { addNodes, removeNodes, addLinks, removeLinks } = mapStageData(
      stages[slide][prevStep]
    );
    applyChanges(removeNodes, addNodes, removeLinks, addLinks);
  }
  if (step !== prevStep) setPrevStep(step);

  return (
    <Graph
      id="graph"
      config={{
        d3: {
          gravity: -200,
        },
        node: {
          size: 300,
          fontColor: "white",
          fontSize: 20,
        },
        link: {
          fontColor: "white",
        },
      }}
      data={{
        nodes,
        links,
      }}
    ></Graph>
  );
};

function App() {
  const [slide, setSlide] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const advance = () => {
      if (step < stages[slide].length - 1) {
        setStep(step + 1);
      } else if (slide < stages.length - 1) {
        setStep(0);
        setSlide(slide + 1);
      }
    };

    const reverse = () => {
      // FIXME: allow going back and forward between steps
      if (slide > 0) {
        setStep(0);
        setSlide(slide - 1);
      } else {
        setStep(0);
      }
    };

    const listener = ({ key }: KeyboardEvent) => {
      if (key === "ArrowRight") {
        advance();
      } else if (key === "ArrowLeft") {
        reverse();
      }
    };
    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [slide, step]);

  console.log("Currently on slide:", slide, "step:", step);

  return (
    <div>
      <RenderNetwork slideNum={slide} step={step}></RenderNetwork>
    </div>
  );
}

export default App;
