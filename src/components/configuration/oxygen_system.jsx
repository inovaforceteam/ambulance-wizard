"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../common/label";
import OptionButton from "../common/option-button";

const OxygenSystem = ({ setActive, generally, setGenerally,name, buttons }) => {
  const [selectedSystem, setSelectedSystem] = useState("");
  const [price, setPrice] = useState(0);
  const [vehicleData, setVehicleData] = useState(null);

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

  const handleNext = () => {
    setActive((prev) => prev + 1);
  };

  const handleBack = () => {
    setActive((prev) => prev - 1);
  };

  if (!vehicleData) {
    return <div>Yükleniyor...</div>;
  }

  const handleSelect = (system) => {
    // Yeni seçilen sistemin fiyatını al
    let newPrice = 0;
    switch (system) {
      case "Intersurgical":
        newPrice = parseFloat(
          vehicleData[8].central_oxygen_system[0].price.replace("$", "")
        );
        break;
      case "Dräger":
        newPrice = parseFloat(
          vehicleData[8].central_oxygen_system[1].price.replace("$", "")
        );
        break;
      case "Air Liquide":
        newPrice = parseFloat(
          vehicleData[8].central_oxygen_system[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    // Eğer bir sistem daha önce seçilmişse, eski sistemin fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.oxygenSystem &&
      generally.medical.oxygenSystem !== system
    ) {
      switch (generally.medical.mainStretcher) {
        case "Intersurgical":
          oldPrice = parseFloat(
            vehicleData[8].central_oxygen_system[0].price.replace("$", "")
          );
          break;
        case "Dräger":
          oldPrice = parseFloat(
            vehicleData[8].central_oxygen_system[1].price.replace("$", "")
          );
          break;
        case "Air Liquide":
          oldPrice = parseFloat(
            vehicleData[8].central_oxygen_system[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    // `selectedSystem`'i güncelle
    setSelectedSystem(system);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        oxygenSystem: system,
      },
      prices: {
        ...prev.prices,
        oxygenSystem: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[8].image_url}
        alt={vehicleData[8].central_oxygen_system[0].name}
        style={{ objectFit: "cover", display: "block", margin: "0 auto" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {vehicleData[8].central_oxygen_system.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.oxygenSystem === type.name}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <OptionButton handleBack={handleBack} back={buttons.back} />
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
    </div>
  );
};

export default OxygenSystem;
