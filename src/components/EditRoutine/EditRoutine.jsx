import RoutineText from '../molecules/RoutineText/RoutineText';
import RoutinePose from '../molecules/RoutinePose/RoutinePose';

import { useTranslation } from 'react-i18next';

/**
 * const onDrop = (event, newIndex) => {
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
  }; */

export default function ({poses, setRoutine}) {
    const { t } = useTranslation();

    const emptyPlaceholder = (
        <div>
            <p>{t("noPoses")}</p>
        </div>
    )

    const handleChange = (event, index) => {
        const newPoseArray = [...poses];
        let newValue = null
        if (event.target.checked == true || event.target.type != "checkbox")
          newValue = event.target.value
        
        newPoseArray[index][event.target.name] = newValue 
        setRoutine((prevRoutine) => ({ 
            ...prevRoutine,
            poses: newPoseArray,
        }));
      }

    const handleRemoval = (index) => {
        const newPoseArray = [...poses];
        newPoseArray.splice(index, 1);
        setRoutine((prevRoutine) => ({
          ...prevRoutine,
          poses: newPoseArray,
        }));
    };

    let renderedPoses = []
    if (poses.length) {
        renderedPoses = poses.map((pose, i) => (
            <div key={i} className="pose-wrapper">
            {
                pose.type == "text" 
                    ? <RoutineText value={pose.text} index={i} handleChange={handleChange} handleRemoval={handleRemoval}/> 
                    : <RoutinePose pose={pose} index={i} handleChange={handleChange} handleRemoval={handleRemoval}/>
            }
            </div>
        ))
    }

    return (
        <div className="picture-dropzone">
              {poses ? renderedPoses : emptyPlaceholder}
        </div>
    )
}