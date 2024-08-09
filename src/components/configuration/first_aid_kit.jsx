"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "..common/label";
import OptionButton from "../common/option-button";

const FirstAidKit = ({ setActive, generally, setGenerally,name, buttons }) => {
  const [selectedKit, setSelectedKit] = useState("");
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

  const handleSelect = (kit) => {
    // Yeni seçilen kit'in fiyatını al
    let newPrice = 0;
    switch (kit) {
      case "Johnson & Johnson":
        newPrice = parseFloat(
          vehicleData[7].first_aid_kit[0].price.replace("$", "")
        );
        break;
      case "First Aid Only":
        newPrice = parseFloat(
          vehicleData[7].first_aid_kit[1].price.replace("$", "")
        );
        break;
      case "Beiersdorf":
        newPrice = parseFloat(
          vehicleData[7].first_aid_kit[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    // Eğer bir kit daha önce seçilmişse, eski kit'in fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.firstAidKit &&
      generally.medical.firstAidKit !== kit
    ) {
      switch (generally.medical.firstAidKit) {
        case "Johnson & Johnson":
          oldPrice = parseFloat(
            vehicleData[7].first_aid_kit[0].price.replace("$", "")
          );
          break;
        case "First Aid Only":
          oldPrice = parseFloat(
            vehicleData[7].first_aid_kit[1].price.replace("$", "")
          );
          break;
        case "Beiersdorf":
          oldPrice = parseFloat(
            vehicleData[7].first_aid_kit[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    // `selectedKit`'i güncelle
    setSelectedKit(kit);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        firstAidKit: kit,
      },
      prices: {
        ...prev.prices,
        firstAidKit: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[7].image_url}
        alt={vehicleData[7].first_aid_kit[0].name}
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
        {vehicleData[7].first_aid_kit.map((type) => (
          <SelectButton
            key={type.name}
            value={type.price}
            handleSelect={handleSelect}
            option={type.name}
            price={type.price}
            disabled={generally.medical.firstAidKit === type.name}
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

export default FirstAidKit;
