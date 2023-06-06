import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ControlButtons from "../components/molecules/ControlButtons/ControlButtons";

import Poses from "../components/Poses/Poses";
import Button from "../components/atoms/Button/Button";

import { useUser } from "../context/UserContext";
import { saveRoutine } from "../../firebase";

export default function () {

    const {loggedInUser} = useUser()

    const location = useLocation();

    let editId = false
    if (location.state?.id)
        editId = location.state.id

  const [newRoutine, setNewRoutine] = useState(location.state?.routine || { name: "", poses: [] });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, newIndex) => {
    event.preventDefault();
    const name = event.dataTransfer.getData("name");
    const index = event.dataTransfer.getData("index");
  
    if (!name) {
      return;
    }
  
    let newPoseArray;
  
    if (index !== "") {
      // Reorder existing pose to new index
      newPoseArray = [...newRoutine.poses];
      const poseToUpdate = newPoseArray[index];
      newPoseArray.splice(index, 1);
      newPoseArray.splice(newIndex, 0, {
        ...poseToUpdate,
        breath: poseToUpdate.breath || "",
        assistiveEquipment: poseToUpdate.assistiveEquipment || []
      });
    } else {
      // Insert new pose at new index or append to end
      newPoseArray = [...newRoutine.poses];
      if (newIndex && newIndex !== newPoseArray.length) {
        newPoseArray.splice(newIndex, 0, {
          name: name,
          breath: "",
          assistiveEquipment: []
        });
      } else {
        newPoseArray.push({ name: name, breath: "", assistiveEquipment: [] });
      }
    }
  
    setNewRoutine((prevRoutine) => ({
      ...prevRoutine,
      poses: newPoseArray,
    }));
  
    event.stopPropagation();
  };
  

  const onDragStart = (event, pose, index) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("name", pose);
  };

  const onNameChange = (event) => {
    setNewRoutine((prevRoutine) => ({
      ...prevRoutine,
      name: event.target.value,
    }));
  };

  const handleControlChange = (event, index) => {
    const newPoseArray = [...newRoutine.poses];
    let newValue = null
    if (event.target.checked == true || event.target.type != "checkbox")
      newValue = event.target.value
    
    newPoseArray[index][event.target.name] = newValue 
    setNewRoutine((prevRoutine) => ({ 
        ...prevRoutine,
        poses: newPoseArray,
    }));
  }

  const handlePoseRemoval = (index) => {
    const newPoseArray = [...newRoutine.poses];
    newPoseArray.splice(index, 1);
    setNewRoutine((prevRoutine) => ({
      ...prevRoutine,
      poses: newPoseArray,
    }));
  };

  const onSave = async () => {

    if (!newRoutine.name) {
        setError('Bitte Namen eingeben');
        return;
    }
    if (!newRoutine.poses.length) {
        setError('Bitte mindestens eine Pose hinzufügen eingeben');
        return;
    }

    const routineToSave = {userEmail: loggedInUser.email, date: new Date(Date.now()),...newRoutine}

    const id = await saveRoutine(routineToSave, editId)

    navigate(`/flows/${id}`)
  };

  const newTextField = () => {
    const newPoseArray = [...newRoutine.poses];
    newPoseArray.push({type: "text", text: ""})
    setNewRoutine((prevRoutine) => ({ 
        ...prevRoutine,
        poses: newPoseArray,
    }));
  }

    let poses = []
    if(newRoutine.poses.length) {
        poses = newRoutine.poses.map((pose, i) => {
            if (pose.type == "text")
                return (
                    <div key={i} className="pose-wrapper">
                        <div
                            className="pose-text"
                            draggable
                            onDragStart={(event) => onDragStart(event, pose.name, i)}
                            onDrop={(event) => onDrop(event, i)}
                        >
                            <textarea 
                                className="pose-text-input" 
                                name="text"
                                placeholder="Text eingeben"
                                value={pose.text} 
                                onChange={(event) => handleControlChange(event, i)}
                            />
                            <button className="remove-pose" onClick={() => handlePoseRemoval(i)}>Entfernen</button>

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
                        <img src={`poses/${pose.name}.svg`} alt={pose.name} />
                        <div className="pose-controls">
                        <ControlButtons
                            label="Atmung"
                            type="checkbox"
                            name="breath"
                            i={i}
                            handleChange={handleControlChange}
                            first={{value:"Einamten", checked: pose.breath === "Einamten", label: "Ein"}}
                            second={{value:"Ausatmen",checked: pose.breath === "Ausatmen",label: "Aus"}}
                        />
                        <ControlButtons
                            label="Hilfsmittel"
                            type="checkbox"
                            name="assistiveEquipment"
                            i={i}
                            handleChange={handleControlChange}
                            first={{value:"Klotz", checked: pose.assistiveEquipment === 'Klotz',label: "Klotz"}}
                            second={{value:"Gurt", checked: pose.assistiveEquipment === 'Gurt',label: "Gurt"}}
                        />
                        <button className="remove-pose" onClick={() => handlePoseRemoval(i)}>Entfernen</button>
                        </div>
                    </div>
                    </div>
                )
        })
    } else {
        poses = (
            <div onDrop={onDrop}>
                <p>Keine Pose hinzugefügt. Ziehen Sie jetzt eine Pose hierher.</p>
            </div>
        )
    }

  return (
    <main className="new-routine">
      <div className="routine-container">
        <label className="routine-input-label">Flow Name</label>
        <input type="text" onChange={onNameChange} value={newRoutine.name} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="picture-dropzone" onDragOver={onDragOver} onDrop={onDrop}>
            {poses}
        </div>
        <div className="button-container">
            <Button
                type="secondary"
                clickHandler={onSave}
                text="Speichern"
            />
            <Button
                type="light"
                clickHandler={newTextField}
                text="Textfeld hinzufügen"
            />
        </div>
      </div>
      <Poses />
    </main>
  );
}
