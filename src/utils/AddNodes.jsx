import { useContext } from "react";
import { AppContext } from "../components/ContextProvider";

export const addNodes = (type,data,title) => {
    const {setNodes}=useContext(AppContext);
    const label = data.map(item=>{
        return `${item.title}${data.length>1?", ":""  }`
    }).join(" ")
   
   
    setNodes((nds) => [
      ...nds,
      {
        id: `${nds.length + 1}`,
        position: { x: 200, y:100},
        data: { title:title, label:label},
        type: type,
      },
    ]);
  };