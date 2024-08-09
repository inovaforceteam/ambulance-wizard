"use client";
import { useState, useEffect } from "react";
import Label from "../label";
import OptionButton from "../option-button";
import styles from "@/styles/components/configuration/extra_features.module.scss";

const ExtraFeaturesSelector = ({
  setActive,
  setSection,
  generally,
  setGenerally,
  name,
  buttons,
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState(
    generally.pyschical.extraFeatures || []
  );

  const handleSelectFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  useEffect(() => {
    setGenerally((prev) => ({
      ...prev,
      pyschical: {
        ...prev.pyschical,
        extraFeatures: selectedFeatures,
      },
    }));
  }, [selectedFeatures, setGenerally]);

  const handleNext = () => {
    setActive(1);
    setSection("medical");
  };

  const handleBack = () => {
    setActive((prev) => prev - 1);
  };

  return (
    <div>
      <Label title={name}></Label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.extra_features}>
          <button
            onClick={() => handleSelectFeature("Monitor & Vital Signs")}
            style={{
              backgroundColor: selectedFeatures.includes(
                "Monitor & Vital Signs"
              )
                ? "#fbf79e"
                : "lightgrey",
              padding: "22px 20px",
              border: " 2px solid #cdca8d",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Monitor & Vital Signs
          </button>
          <button
            onClick={() => handleSelectFeature("Medication and Injection Sets")}
            style={{
              backgroundColor: selectedFeatures.includes(
                "Medication and Injection Sets"
              )
                ? "#fbf79e"
                : "lightgrey",
              padding: "22px 20px",
              border: " 2px solid #cdca8d",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Medication and Injection Sets
          </button>
          <button
            onClick={() => handleSelectFeature("Portable Ventilator")}
            style={{
              backgroundColor: selectedFeatures.includes("Portable Ventilator")
                ? "#fbf79e"
                : "lightgrey",
              padding: "22px 20px",
              border: " 2px solid #cdca8d",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Portable Ventilator
          </button>
          <button
            onClick={() => handleSelectFeature("Suction Unit")}
            style={{
              backgroundColor: selectedFeatures.includes("Suction Unit")
                ? "#fbf79e"
                : "lightgrey",
              padding: "22px 20px",
              border: " 2px solid #cdca8d",
              borderRadius: "5px",
              gap: "35px !important",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Suction Unit
          </button>
          <button
            onClick={() => handleSelectFeature("Defibrillator")}
            style={{
              backgroundColor: selectedFeatures.includes("Defibrillator")
                ? "#fbf79e"
                : "lightgrey",
              padding: "22px 20px",
              border: " 2px solid #cdca8d",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Defibrillator
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginButton: "10px",
        }}
      >
        <OptionButton handleBack={handleBack} back={buttons.back} />
        <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
    </div>
  );
};

export default ExtraFeaturesSelector;
