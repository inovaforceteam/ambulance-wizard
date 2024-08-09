"use client";
import { useEffect, useState } from 'react';
import Label from '../label';
import styles from '@/styles/components/configuration/traction_type.module.scss';
import { getAllInformation } from '@/services/api';
import SelectButton from '../common/select-button';
import OptionButton from '../option-button';

const TractionTypeSelector = ({setActive,generally,setGenerally,name,buttons}) => {
    const [selectedTractionType, setSelectedTractionType] = useState("");
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
        case "4X4":
          newPrice = parseFloat(
            vehicleData[1].traction_type[0].price.replace("$", "")
          );
          break;
        case "4X2":
          newPrice = parseFloat(
            vehicleData[1].traction_type[1].price.replace("$", "")
          );
          break;
        default:
          newPrice = 0;
      }
      let oldPrice = 0;
      if (
        generally.pyschical.tractionType &&
        generally.pyschical.tractionType !== vehicle
      ) {
        switch (generally.pyschical.tractionType) {
          case "4X4":
            oldPrice = parseFloat(
              vehicleData[1].traction_type[0].price.replace("$", "")
            );
            break;
          case "4X2":
            oldPrice = parseFloat(
              vehicleData[1].traction_type[1].price.replace("$", "")
            );
            break;
          default:
            oldPrice = 0;
        }
      }
      // `selectedStretcher`'ı güncelle
      setSelectedTractionType(vehicle);
      setPrice(newPrice);
      // `totalPrice` hesapla ve güncelle
      setGenerally((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice - oldPrice + newPrice,
        pyschical: {
          ...prev.pyschical,
          tractionType: vehicle,
        },
        prices: {
          ...prev.prices,
          tractionType: newPrice,
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
        <div className={styles.traction_type}>
          <div className={styles.traction_selected}>
            {vehicleData[1].traction_type.map((type) => (
              <SelectButton
                key={type.name}
                value={type.price}
                handleSelect={handleSelect}
                option={type.name}
                price={type.price}
                disabled={generally.pyschical.tractionType === type.name}
              />
            ))}
          </div>
        </div>  
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <OptionButton handleBack={handleBack} back={buttons.back} />
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
      </div>
    );
};
export default TractionTypeSelector;