"use client";
import { useEffect, useState } from "react";
import Label from "..common/label";
import styles from "@/styles/components/configuration/ambulance_type.module.scss";
import { getAllInformation } from "@/services/api";
import SelectButton from "../common/select-button";
import OptionButton from "..common/option-button";

const AmbulanceType = ({ setActive, generally, setGenerally, name, buttons }) => {
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInformation();
        setVehicleData(data);
      } catch (error) {
        console.error("Araç verilerini alırken hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  if (!vehicleData) {
    return <div>Loading...</div>;
  }

  const handleSelect = (vehicle) => {
    let newPrice = 0;
    switch (vehicle) {
      case "Basic Life Support":
        newPrice = parseFloat(
          vehicleData[2].ambulance_type[0].price.replace("$", "")
        );
        break;
      case "Advanced Life Support":
        newPrice = parseFloat(
          vehicleData[2].ambulance_type[1].price.replace("$", "")
        );
        break;
      case "Intensive Care Ambulance":
        newPrice = parseFloat(
          vehicleData[2].ambulance_type[2].price.replace("$", "")
        );
        break;
      case "Pediatric Ambulance":
        newPrice = parseFloat(
          vehicleData[2].ambulance_type[3].price.replace("$", "")
        );
        break;
      case "Newborn Ambulance":
        newPrice = parseFloat(
          vehicleData[2].ambulance_type[4].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    let oldPrice = 0;
    if (
      generally.pyschical.ambulanceType &&
      generally.pyschical.ambulanceType !== vehicle
    ) {
      switch (generally.pyschical.ambulanceType) {
        case "Basic Life Support":
          oldPrice = parseFloat(
            vehicleData[2].ambulance_type[0].price.replace("$", "")
          );
          break;
        case "Advanced Life Support":
          oldPrice = parseFloat(
            vehicleData[2].ambulance_type[1].price.replace("$", "")
          );
          break;
        case "Intensive Care Ambulance":
          oldPrice = parseFloat(
            vehicleData[2].ambulance_type[2].price.replace("$", "")
          );
          break;
        case "Pediatric Ambulance":
          oldPrice = parseFloat(
            vehicleData[2].ambulance_type[3].price.replace("$", "")
          );
          break;
        case "Newborn Ambulance":
          oldPrice = parseFloat(
            vehicleData[2].ambulance_type[4].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    setSelectedAmbulanceType(vehicle);
    setPrice(newPrice);
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      pyschical: {
        ...prev.pyschical,
        ambulanceType: vehicle,
      },
      prices: {
        ...prev.prices,
        ambulanceType: newPrice,
      },
    }));
  };

  const handleNext = () => {
    setActive((prev) => prev + 1);
  };

  const handleBack = () => {
    setActive((prev) => prev - 1);
  };

  return (
    <div className={styles.container}>
      <Label title={name} />
      <div className={styles.ambulance_type_container}>
        {vehicleData[2].ambulance_type.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.pyschical.ambulanceType === type.name}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>
      <OptionButton handleBack={handleBack} back={buttons.back} />
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
     </div> 
  );
};    

export default AmbulanceType;
