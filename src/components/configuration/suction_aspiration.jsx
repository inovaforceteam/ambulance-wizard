"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../common/label";
import OptionButton from "../common/option-button";

const SuctionAspiration = ({ setActive, generally, setGenerally,name, buttons }) => {
  const [selectedDevice, setSelectedDevice] = useState("");
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

  const handleSelect = (device) => {
    let newPrice = 0;
    switch (device) {
      case "Laerdal":
        newPrice = parseFloat(
          vehicleData[10].suction_aspiration[0].price.replace("$", "")
        );
        break;
      case "SSCOR":
        newPrice = parseFloat(
          vehicleData[10].suction_aspiration[1].price.replace("$", "")
        );
        break;
      case "Medela":
        newPrice = parseFloat(
          vehicleData[10].suction_aspiration[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    let oldPrice = 0;
    if (
      generally.medical.suctionAspiration &&
      generally.medical.suctionAspiration !== device
    ) {
      switch (generally.medical.suctionAspiration) {
        case "Laerdal":
          oldPrice = parseFloat(
            vehicleData[10].suction_aspiration[0].price.replace("$", "")
          );
          break;
        case "SSCOR":
          oldPrice = parseFloat(
            vehicleData[10].suction_aspiration[1].price.replace("$", "")
          );
          break;
        case "Medela":
          oldPrice = parseFloat(
            vehicleData[10].suction_aspiration[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    setSelectedDevice(device);
    setPrice(newPrice);

    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        suctionAspiration: device,
      },
      prices: {
        ...prev.prices,
        suctionAspiration: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[10].image_url}
        alt={vehicleData[10].image_url}
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
        {vehicleData[10].suction_aspiration.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.suctionAspiration === type.name}
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

export default SuctionAspiration;
