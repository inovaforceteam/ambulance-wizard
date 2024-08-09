"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../label";
import OptionButton from "../common/option-button";

const BluetoothTransmissionSelector = ({
  setActive,
  generally,
  setGenerally,
  name,
  buttons,
}) => {
  const [selectedSystem, setSelectedSystem] = useState("");
  const [price, setPrice] = useState(100);
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
    return <div>Loading...</div>;
  }

  const handleSelect = (system) => {
    // Yeni seçilen sistemin fiyatını al
    let newPrice = 0;
    switch (system) {
      case "Philips":
        newPrice = parseFloat(
          vehicleData[12].bluetooth_transmission[0].price.replace("$", "")
        );
        break;
      case "GE Healthcare":
        newPrice = parseFloat(
          vehicleData[12].bluetooth_transmission[1].price.replace("$", "")
        );
        break;
      case "Welch Allyn":
        newPrice = parseFloat(
          vehicleData[12].bluetooth_transmission[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    // Eğer bir sistem daha önce seçilmişse, eski sistemin fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.bluetoothTransmission &&
      generally.medical.bluetoothTransmission !== system
    ) {
      switch (generally.medical.bluetoothTransmission) {
        case "Philips":
          oldPrice = parseFloat(
            vehicleData[12].bluetooth_transmission[0].price.replace("$", "")
          );
          break;
        case "GE Healthcare":
          oldPrice = parseFloat(
            vehicleData[12].bluetooth_transmission[1].price.replace("$", "")
          );
          break;
        case "Welch Allyn":
          oldPrice = parseFloat(
            vehicleData[12].bluetooth_transmission[2].price.replace("$", "")
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
        bluetoothTransmission: system,
      },
      prices: {
        ...prev.prices,
        bluetoothTransmission: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[12].image_url}
        alt={vehicleData[12].bluetooth_transmission[0].name}
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
        {vehicleData[12].bluetooth_transmission.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.bluetoothTransmission === type.name}
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

export default BluetoothTransmissionSelector;
