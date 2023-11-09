import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from '../util/isTouch';

import Poses from "../components/Poses/Poses";
import EditRoutine from "../components/EditRoutine/EditRoutine";
import Button from "../components/atoms/Button/Button";

import { useUser } from "../context/UserContext";
import { saveRoutine } from "../../firebase";

export default function () {

    const {loggedInUser} = useUser()
    const { t } = useTranslation();
    const location = useLocation();

    const Backend = isTouchDevice() ? TouchBackend : HTML5Backend;

    let editId = false
    if (location.state?.id)
        editId = location.state.id

  const [routine, setRoutine] = useState(location.state?.routine || { name: "", poses: [] });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onNameChange = (event) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      name: event.target.value,
    }));
  };

  const onSave = async () => {
    if (!routine.name) {
        setError(t("addName"));
        return;
    }
    if (!routine.poses.length) {
        setError(t("atLeastOnePose"));
        return;
    }

    const routineToSave = {userEmail: loggedInUser.email, date: new Date(Date.now()),...routine}
    const id = await saveRoutine(routineToSave, editId)
    navigate(`/flows/${id}`)
  };

  const newTextField = () => {
    const newPoseArray = [...routine.poses];
    newPoseArray.push({type: "text", text: ""})
    setRoutine((prevRoutine) => ({ 
        ...prevRoutine,
        poses: newPoseArray,
    }));
  }

  return (
    <DndProvider backend={Backend}>
      <main className="new-routine">
        <div className="routine-container">
          <label className="routine-input-label">Flow Name</label>
          <input type="text" onChange={onNameChange} value={routine.name} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <EditRoutine poses={routine.poses} setRoutine={setRoutine}/>
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
    </DndProvider>
  );
}
