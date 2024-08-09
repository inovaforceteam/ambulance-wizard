"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../label";
import OptionButton from "../common/option-button";

const Defibrillator = ({ setActive, generally, setGenerally,name, buttons }) => {
  const [selectedDefibrillator, setSelectedDefibrillator] = useState("");
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
    return <div>Yükleniyor...</div>;
  }

  const handleSelect = (defibrillator) => {
    let newPrice = 0;
    switch (defibrillator) {
      case "Zoll":
        newPrice = parseFloat(
          vehicleData[11].defibrillator[0].price.replace("$", "")
        );
        break;
      case "Philips":
        newPrice = parseFloat(
          vehicleData[11].defibrillator[1].price.replace("$", "")
        );
        break;
      case "Physio-Control":
        newPrice = parseFloat(
          vehicleData[11].defibrillator[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    let oldPrice = 0;
    if (
      generally.medical.defibrillator &&
      generally.medical.defibrillator !== defibrillator
    ) {
      switch (generally.medical.defibrillator) {
        case "Zoll":
          oldPrice = parseFloat(
            vehicleData[11].defibrillator[0].price.replace("$", "")
          );
          break;
        case "Philips":
          oldPrice = parseFloat(
            vehicleData[11].defibrillator[1].price.replace("$", "")
          );
          break;
        case "Physio-Control":
          oldPrice = parseFloat(
            vehicleData[11].defibrillator[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    setSelectedDefibrillator(defibrillator);
    setPrice(newPrice);

    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        defibrillator: defibrillator,
      },
      prices: {
        ...prev.prices,
        defibrillator: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[11].image_url}
        alt={vehicleData[11].image_url}
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
        {vehicleData[11].defibrillator.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.defibrillator === type.name}
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

export default Defibrillator;
