import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import ControlButtons from "../components/molecules/ControlButtons/ControlButtons";

import Poses from "../components/Poses/Poses";
import Button from "../components/atoms/Button/Button";

import { saveFlow, getUserFlows } from "../services/supabaseService";

import { useAuth0 } from '@auth0/auth0-react';

export default function () {

    const {user} = useAuth0();

    const location = useLocation();

    const { t } = useTranslation();

    let editId
    if (location.state?.id)
        editId = location.state.id

  const [newFlow, setNewFlow] = useState(location.state?.flow || { name: "", poses: [] });
  const [error, setError] = useState('');
  const [placeholder, setPlaceholder] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const setDefaultPlaceholder = async () => {
      if (!location.state?.flow) {
        const flows = await getUserFlows(user.email);
        const nextNumber = flows.length + 1;
        setPlaceholder(`Flow No. ${nextNumber}`);
      }
    };
    setDefaultPlaceholder();
  }, []);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, newIndex) => {
    event.preventDefault();
    const pose_id = event.dataTransfer.getData("pose_id");
    const index = event.dataTransfer.getData("index");
  
    if (!pose_id) {
      return;
    }
  
    let newPoseArray;
  
    if (index !== "") {
      // Reorder existing pose to new index
      newPoseArray = [...newFlow.poses];
      const poseToUpdate = newPoseArray[index];
      newPoseArray.splice(index, 1);
      newPoseArray.splice(newIndex, 0, {
        ...poseToUpdate,
        breath: poseToUpdate.breath || "",
        equipment: poseToUpdate.equipment || "",
        type: poseToUpdate.type || "pose"
      });
    } else {
      // Insert new pose at new index or append to end
      newPoseArray = [...newFlow.poses];
      if (newIndex && newIndex !== newPoseArray.length) {
        newPoseArray.splice(newIndex, 0, {
          pose_id: pose_id,
          breath: "",
          equipment: "",
          type: "pose"
        });
      } else {
        newPoseArray.push({ pose_id: pose_id, breath: "", equipment: "", type: "pose" });
      }
    }
  
    setNewFlow((prevFlow) => ({
      ...prevFlow,
      poses: newPoseArray,
    }));
  
    event.stopPropagation();
  };
  

  const onDragStart = (event, pose, index) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("pose_id", pose);
  };

  const onNameChange = (event) => {
    setNewFlow((prevFlow) => ({
      ...prevFlow,
      name: event.target.value,
    }));
  };

  const handleControlChange = (event, index) => {
    const newPoseArray = [...newFlow.poses];
    let newValue = null
    if (event.target.checked == true || event.target.type != "checkbox")
      newValue = event.target.value
    
    newPoseArray[index][event.target.name] = newValue 
    setNewFlow((prevFlow) => ({ 
        ...prevFlow,
        poses: newPoseArray,
    }));
  }

  const handlePoseRemoval = (index) => {
    const newPoseArray = [...newFlow.poses];
    newPoseArray.splice(index, 1);
    setNewFlow((prevFlow) => ({
      ...prevFlow,
      poses: newPoseArray,
    }));
  };

  const onSave = async () => {
    let flowToSave = { ...newFlow };
    
    if (!flowToSave.name) {
        flowToSave.name = placeholder;
    }
    
    if (!flowToSave.poses.length) {
        setError(t("atLeastOnePose"));
        return;
    }

    flowToSave = {
      user_email: user.email,
      id: editId,
      ...flowToSave
    }
    
    const id = await saveFlow(flowToSave);
    navigate(`/flows/${id}`);
  };

  const newTextField = () => {
    const newPoseArray = [...newFlow.poses];
    newPoseArray.push({type: "text", text: ""})
    setNewFlow((prevFlow) => ({ 
        ...prevFlow,
        poses: newPoseArray,
    }));
  }

    let poses = []
    if(newFlow.poses.length) {
        poses = newFlow.poses.map((pose, i) => {
            if (pose.type == "text")
                return (
                    <div key={i} className="pose-wrapper">
                        <div
                            className="pose-text"
                            draggable
                            onDragStart={(event) => onDragStart(event, pose.pose_id, i)}
                            onDrop={(event) => onDrop(event, i)}
                        >
                            <textarea 
                                className="pose-text-input" 
                                name="text"
                                placeholder={t("enterText")}
                                value={pose.text} 
                                onChange={(event) => handleControlChange(event, i)}
                            />
                            <button className="remove-pose" onClick={() => handlePoseRemoval(i)}>{t("delete")}</button>

                        </div>
                    </div>
                )
            else 
                return (
                    <div key={i} className="pose-wrapper">
                    <div 
                        className="pose-image" 
                        draggable 
                        onDragStart={(event) => onDragStart(event, pose.name, i)} 
                        onDrop={(event) => onDrop(event, i)}
                    >
                        <img src={`poses/${pose.pose_id}.svg`} alt={pose.pose_id} />
                        <div className="pose-controls">
                        <ControlButtons
                            label={t("breathing")}
                            type="checkbox"
                            name="breath"
                            i={i}
                            handleChange={handleControlChange}
                            first={{value:"Einamten", checked: pose.breath === "Einamten", label: t("in")}}
                            second={{value:"Ausatmen",checked: pose.breath === "Ausatmen",label: t("out")}}
                        />
                        <ControlButtons
                            label={t("equipment")}
                            type="checkbox"
                            name="equipment"
                            i={i}
                            handleChange={handleControlChange}
                            first={{value:"Klotz", checked: pose.equipment === 'Klotz',label: t("block")}}
                            second={{value:"Gurt", checked: pose.equipment === 'Gurt',label: t("strap")}}
                        />
                        <button className="remove-pose" onClick={() => handlePoseRemoval(i)}>{t("delete")}</button>
                        </div>
                    </div>
                    </div>
                )
        })
    } else {
        poses = (
            <div onDrop={onDrop}>
                <p>{t("noPoses")}</p>
            </div>
        )
    }
  
  return (
    <main className="new-flow">
      <div className="flow-container">
        <label className="flow-input-label">Flow Name</label>
        <input 
            type="text" 
            onChange={onNameChange} 
            value={newFlow.name}
            placeholder={placeholder} 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="picture-dropzone" onDragOver={onDragOver} onDrop={onDrop}>
            {poses}
        </div>
        <div className="button-container">
            <Button
                type={["secondary", "right"]}
                clickHandler={onSave}
                text={t("save")}
            />
            <Button
                type={["light", "right"]}
                clickHandler={newTextField}
                text={t("addText")}
            />
        </div>
      </div>
      <Poses />
    </main>
  );
}
