import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { getAllPoses } from "../../services/supabaseService";

import Button from "../atoms/Button/Button";
import "./Poses.scss"

export default function() {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [poses, setPoses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchPoses = async () => {
        try {
          const posesData = await getAllPoses();
          setPoses(posesData);
        } catch (error) {
          console.error('Fehler beim Laden der Posen:', error);
        }
      };

      fetchPoses();
    }, []);

    const onDragStart = (event, pose) => {
      event.dataTransfer.setData("pose_id", pose.id);
    };

    const getPoseName = (pose) => {
      return i18n.language === 'de' ? pose.name_german : pose.name_english;
    };

    const filterPoses = () => {
      let filteredPoses = poses;
      
      if (selectedCategory) {
        filteredPoses = filteredPoses.filter((pose) => {
          const category = pose.id.charAt(1);
          return category === selectedCategory;
        });
      }
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredPoses = filteredPoses.filter((pose) => 
          (pose.name_german?.toLowerCase().includes(searchLower) || false) ||
          (pose.name_english?.toLowerCase().includes(searchLower) || false) ||
          (pose.name_sanskrit?.toLowerCase().includes(searchLower) || false)
        );
      }
  
      return filteredPoses;
    };

    return (
      <>
        <div className="filter-container">
          <Button
            type={["transparent"]}
            clickHandler={() => setShowFilters(!showFilters)}
            text={showFilters ? t("hideFilters") : t("showFilters")}
          />
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={t("searchPoses")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {showFilters && (
            <div className="filter-buttons">
              <Button type={["pill"]} active={!selectedCategory} clickHandler={() => setSelectedCategory(null)} text={t("allPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "1"} clickHandler={() => setSelectedCategory("1")} text={t("standingPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "2"} clickHandler={() => setSelectedCategory("2")} text={t("sittingPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "3"} clickHandler={() => setSelectedCategory("3")} text={t("kneelingPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "4"} clickHandler={() => setSelectedCategory("4")} text={t("backPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "5"} clickHandler={() => setSelectedCategory("5")} text={t("bellyPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "6"} clickHandler={() => setSelectedCategory("6")} text={t("armPoses")}/>
              <Button type={["pill"]} active={selectedCategory === "7"} clickHandler={() => setSelectedCategory("7")} text={t("symbolPoses")}/>
            </div>
          )}
        <div className="poses-grid">
          {filterPoses().length > 0 ? (
            filterPoses().map((pose) => (
              <div key={pose.id} className="pose-item">
                <img
                  src={`poses/${pose.id}.svg`}
                  draggable
                  onDragStart={(event) => onDragStart(event, pose)}
                />
                <span className="pose-name">{getPoseName(pose)}</span>
              </div>
            ))
          ) : (
            <div className="no-poses-message">{t("noPosesFound")}</div>
          )}
        </div>
      </>
    );
  }