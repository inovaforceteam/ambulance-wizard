"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../label";
import OptionButton from "../common/option-button";

const SpineBoard = ({ setActive, generally, setGenerally,name, buttons }) => {
  const [selectedBoard, setSelectedBoard] = useState("");
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

  const handleSelect = (board) => {
    // Yeni seçilen board'ın fiyatını al
    let newPrice = 0;
    switch (board) {
      case "Ferno":
        newPrice = parseFloat(
          vehicleData[15].spine_board[0].price.replace("$", "")
        );
        break;
      case "Laerdal":
        newPrice = parseFloat(
          vehicleData[15].spine_board[1].price.replace("$", "")
        );
        break;
      case "Spineboard":
        newPrice = parseFloat(
          vehicleData[15].spine_board[2].price.replace("$", "")
        );
        break;
      default:
        newPrice = 0;
    }

    // Eğer bir board daha önce seçilmişse, eski board'ın fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.spineBoard &&
      generally.medical.spineBoard !== board
    ) {
      switch (generally.medical.spineBoard) {
        case "Ferno":
          oldPrice = parseFloat(
            vehicleData[15].spine_board[0].price.replace("$", "")
          );
          break;
        case "Laerdal":
          oldPrice = parseFloat(
            vehicleData[15].spine_board[1].price.replace("$", "")
          );
          break;
        case "Spineboard":
          oldPrice = parseFloat(
            vehicleData[15].spine_board[2].price.replace("$", "")
          );
          break;
        default:
          oldPrice = 0;
      }
    }

    // `selectedBoard`'ı güncelle
    setSelectedBoard(board);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        spineBoard: board,
      },
      prices: {
        ...prev.prices,
        spineBoard: newPrice,
      },
    }));
  };

  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[15].image_url}
        alt={vehicleData[15].spine_board[0].name}
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
        {vehicleData[15].spine_board.map((spine, index) => (
          <SelectButton
            key={index}
            value={spine.price}
            handleSelect={handleSelect}
            option={spine.name}
            price={spine.price}
            disabled={generally.medical.spineBoard === spine.name}
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

export default SpineBoard;
