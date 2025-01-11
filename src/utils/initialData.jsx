import AddLeadSourceNode from "../components/Nodes-Custom/AddLeadSourceNode";
import AddMoreNode from "../components/Nodes-Custom/AddMoreNode";
import ColdEmailNode from "../components/Nodes-Custom/ColdEmailNode";
import LeadSourceNode from "../components/Nodes-Custom/LeadSourceNode";
import SequenceStartPointNode from "../components/Nodes-Custom/SequenceStartPointNode";
import WaitDelayNodes from "../components/Nodes-Custom/WaitDelayNodes";
export const initialNodes = [{
    id:"1",
    position:{ x: 200, y: 100 },
    data:{title:"Add Lead Source", label:"Click to add leads from List or CRM"},
    type:"addLeadSource",
    draggable:false
},
{
    id:"2",
    position:{ x: 200, y: 300 },
    data:{title:"Sequence Start Point"},
    type:"sequenceStartPoint",
    draggable:false
},
{
    id:"n",
    position:{ x: 200, y: 450 },
    type:"addMoreNode",
    draggable:false
}]

export const initialEdges=[{
    id:"2->n", source:"2", target:"n", type:"straight", sourceHandle:"b"
}]
export const nodeType={
addLeadSource:AddLeadSourceNode,
sequenceStartPoint:SequenceStartPointNode,
addMoreNode:AddMoreNode,
leadSourceNode:LeadSourceNode,
coldEmailNode:ColdEmailNode,
waitDelayNode:WaitDelayNodes
}