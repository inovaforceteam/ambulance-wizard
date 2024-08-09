"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Label from "..common/label";
import styles from "@/styles/components/configuration/fuel_type.module.scss";
import { getAllInformation } from "@/services/api";
import SelectButton from "../common/select-button";
import OptionButton from "..common/option-button";
const FuelTypeSelector = ({ setActive, generally, setGenerally,name,buttons }) => {
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [price, setPrice] = useState(100);
  console.log("generally",generally)
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
    return <div>Loding...</div>;
  }
  const handleSelect = (fuel) => {
    // Yeni seçilen stretcher'ın fiyatını al
    console.log("generally", generally);
    let newPrice = 0;
    switch (fuel) {
      case "Gasoline":
        newPrice = parseFloat(
          vehicleData[0].fuel_type[0].price.replace("$", "")
        );
        break;
      case "Diesel":
        newPrice = parseFloat(
          vehicleData[0].fuel_type[1].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }
    let oldPrice = 0;
    if (generally.pyschical.fuelType && generally.pyschical.fuelType !== fuel) {
      switch (generally.pyschical.fuelType) {
        case "Gasoline":
          oldPrice = parseFloat(
            vehicleData[0].fuel_type[0].price.replace("$", "")
          );
          break;
        case "Diesel":
          oldPrice = parseFloat(
            vehicleData[0].fuel_type[1].price.replace("$", "")
          );
          
          break;
        default:
          oldPrice = 0;
      }
    }
    // `selectedStretcher`'ı güncelle
    setSelectedFuelType(fuel);
    setPrice(newPrice);
    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      pyschical: {
        ...prev.pyschical,
        fuelType: fuel,
      },
      prices: {
        ...prev.prices,
        fuelType: newPrice,
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
    <div >
      <Label title={name}></Label>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

      <Image
        src="/images/fuel_type.jpg"
        width={800}
        height={350}
        alt="fuel_type"
       
      />
      </div>
     
      <div className={styles.fuel_type}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {vehicleData[0].fuel_type.map((type) => (
            <SelectButton
           
              key={type.name}
              value={type.price}
              handleSelect={handleSelect}
              option={type.name}
              price={type.price}
              disabled={generally.pyschical.fuelType === type.name}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginButton:"10px" }}>
      {/* <OptionButton handleBack={handleBack} back={buttons.back} /> */}
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
      
    </div>
  );
};
export default FuelTypeSelector;
