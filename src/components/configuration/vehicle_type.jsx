"use client";
import { useState, useEffect } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import Label from "..common/label";
import styles from "@/styles/components/configuration/vehicle_type.module.scss";
import SelectButton from "../common/select-button";
import OptionButton from "..common/option-button";

const VehicleTypeSelector = ({
  setActive,
  generally,
  setGenerally,
  name,
  buttons,
}) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [price, setPrice] = useState(100);
  console.log("generally", generally);
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
    // Yeni seçilen stretcher'ın fiyatını al
    console.log("generally", generally);
    let newPrice = 0;
    switch (vehicle) {
      case "Van Type":
        newPrice = parseFloat(
          vehicleData[3].vehicle_type[0].price.replace("$", "")
        );
        break;
      case "Box Type":
        newPrice = parseFloat(
          vehicleData[3].vehicle_type[1].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }
    let oldPrice = 0;
    if (
      generally.pyschical.vehicleType &&
      generally.pyschical.vehicleType !== vehicle
    ) {
      switch (generally.pyschical.vehicleType) {
        case "Van Type":
          oldPrice = parseFloat(
            vehicleData[3].vehicle_type[0].price.replace("$", "")
          );
          break;
        case "Box Type":
          oldPrice = parseFloat(
            vehicleData[3].vehicle_type[1].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }
    // `selectedStretcher`'ı güncelle
    setSelectedVehicleType(vehicle);
    setPrice(newPrice);
    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      pyschical: {
        ...prev.pyschical,
        vehicleType: vehicle,
      },
      prices: {
        ...prev.prices,
        vehicleType: newPrice,
      },
    }));
    console.log("generally", generally);
  };
  const handleNext = () => {
    setActive((prev) => prev + 1);
  };
  const handleBack = () => {
    setActive((prev) => prev - 1);
  };
  return (
    <div>
      <Label title={name}></Label>
      <div style={{width: "58%"}} className="m-auto d-flex justify-content-center align-items-center">
      <Image
        src={vehicleData[3].image_url.van_type}
        alt="Vehicle Image"
        width={400}
        height={250}
        className={styles.vehicle_type} // 
      />
        <Image
        src={vehicleData[3].image_url.box_type}
        alt="Vehicle Image"
        width={390}
        height={250}
        className={styles.vehicle_type} 
       
      />
      </div>
    
      <div className="{styles.vehicle_selected}">
        <div style={{width: "40%", margin:"auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {vehicleData[3].vehicle_type.map((type) => (
            <SelectButton
              key={type.name}
              value={type.price}
              handleSelect={handleSelect}
              option={type.name}
              price={type.price}
              disabled={generally.pyschical.vehicleType === type.name}
            />
          ))}
        </div>
      </div>
      <div style={{width: "100%",  display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <OptionButton handleBack={handleBack} back={buttons.back} />
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
    </div>
  );
};
export default VehicleTypeSelector;
