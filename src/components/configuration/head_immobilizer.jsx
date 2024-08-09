"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button"; // Eğer bu bileşen varsa, yeniden kullanmak için import ettik
import Label from "../common/label";
import OptionButton from "../common/option-button";

const HeadImmobilizer = ({ setActive, generally, setGenerally, name, buttons }) => {
  const [selectedImmobilizer, setSelectedImmobilizer] = useState("");
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

  const handleSelect = (immobilizer) => {
    // Seçilen immobilizer'ın fiyatını güncelle
    let newPrice = 0;
    switch (immobilizer) {
      case "Ferno":
        newPrice = parseFloat(
          vehicleData[16].head_immobilizer[0].price.replace("$", "")
        );
        break;
      case "Laerdal":
        newPrice = parseFloat(
          vehicleData[16].head_immobilizer[1].price.replace("$", "")
        );
        break;
      case "Ambu":
        newPrice = parseFloat(
          vehicleData[16].head_immobilizer[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    // Eğer daha önce seçilmiş bir immobilizer varsa, eski immobilizer'ın fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.headImmobilizer &&
      generally.medical.headImmobilizer !== immobilizer
    ) {
      switch (generally.medical.headImmobilizer) {
        case "Ferno":
          oldPrice = parseFloat(
            vehicleData[16].head_immobilizer[0].price.replace("$", "")
          );
          break;
        case "Laerdal":
          oldPrice = parseFloat(
            vehicleData[16].head_immobilizer[1].price.replace("$", "")
          );
          break;
        case "Ambu":
          oldPrice = parseFloat(
            vehicleData[16].head_immobilizer[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    // `selectedImmobilizer`'ı güncelle ve fiyatı ayarla
    setSelectedImmobilizer(immobilizer);
    setPrice(newPrice);

    // `totalPrice` ve `headImmobilizer`'ı güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        headImmobilizer: immobilizer,
      },
      prices: {
        ...prev.prices,
        headImmobilizer: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[16].image_url}
        alt={vehicleData[16].head_immobilizer[0].name}
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
        {vehicleData[16].head_immobilizer.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.headImmobilizer === type.name}
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

export default HeadImmobilizer;
