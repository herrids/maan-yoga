import { useState } from "react";
import { useTranslation } from 'react-i18next';

import Button from "../atoms/Button/Button";
import "./Poses.scss"

const images = Object.values(import.meta.glob('/public/poses/*.svg'))
  .map(image => image.name.match(/([^/]*)(?=\.\w+$)/)[1]);

export default function() {
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const onDragStart = (event, name) => {
      event.dataTransfer.setData("pose_id", name);
    };

    const filterImages = () => {
      if (!selectedCategory) {
        return images;
      }
  
      return images.filter((name) => {
        const category = name.charAt(1);
        return category === selectedCategory;
      });
    };

    return (
      <>
        <div className="filter-buttons">
          <Button type="pill" active={!selectedCategory} clickHandler={() => setSelectedCategory(null)} text={t("allPoses")}/>
          <Button type="pill" active={selectedCategory === "1"} clickHandler={() => setSelectedCategory("1")} text={t("standingPoses")}/>
          <Button type="pill" active={selectedCategory === "2"} clickHandler={() => setSelectedCategory("2")} text={t("sittingPoses")}/>
          <Button type="pill" active={selectedCategory === "3"} clickHandler={() => setSelectedCategory("3")} text={t("kneelingPoses")}/>
          <Button type="pill" active={selectedCategory === "4"} clickHandler={() => setSelectedCategory("4")} text={t("backPoses")}/>
          <Button type="pill" active={selectedCategory === "5"} clickHandler={() => setSelectedCategory("5")} text={t("bellyPoses")}/>
          <Button type="pill" active={selectedCategory === "6"} clickHandler={() => setSelectedCategory("6")} text={t("armPoses")}/>
          <Button type="pill" active={selectedCategory === "7"} clickHandler={() => setSelectedCategory("7")} text={t("symbolPoses")}/>
        </div>
        <div className="poses-grid">
          {filterImages().map((key, i) => (
            <img
              key={i}
              src={`poses/${key}.svg`}
              draggable
              onDragStart={(event) => onDragStart(event, key)}
            />
          ))}
        </div>
      </>
    );
  }