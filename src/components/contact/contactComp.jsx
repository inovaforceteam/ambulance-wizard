"use client"; 
import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FirmContactForm from "./contactForm";

const ContactComp = ({ dict }) => {
  const [ambulanceData, setAmbulanceData] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    const savedData = localStorage.getItem("ambulanceData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const translatedData = translateKeys(parsedData);
      setAmbulanceData(translatedData);
    }
  }, [translateKeys]);

  const translateKeys = (data) => {
    const translatedPyschical = Object.fromEntries(
      Object.entries(data.pyschical).map(([key, value]) => [
        dict.initAmbulance.pyschical[key],
        value,
      ])
    );
    const translatedMedical = Object.fromEntries(
      Object.entries(data.medical).map(([key, value]) => [
        dict.initAmbulance.medical[key],
        value,
      ])
    );
    return {
      pyschical: translatedPyschical,
      medical: translatedMedical,
      totalPrice: data.totalPrice,
    };
  };

  const renderTable = (data) => {
    return (
      <Table striped bordered hover className="responsiveTable mb-3">
        <thead>
          <tr>
            <th className="text-center">{dict.common.equipment}</th>
            <th className="text-center">{dict.common.brand}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {Array.isArray(value) ? value.join(", ") : value.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      scrollY: -window.scrollY,
      useCORS: true,
    });
    const data = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait", // or 'landscape'
      unit: "mm",
      format: "a4", // A4 size
    });

    // Get canvas dimensions
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions to fit the PDF page
    const imgWidth = pdfWidth;
    const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    // Add image to PDF
    pdf.addImage(data, "WEBP", 0, 0, imgWidth, imgHeight);

    // Add creation date
    const date = new Date().toLocaleDateString();
    pdf.text(`Created on: ${date}`, 10, pdfHeight - 10);

    pdf.save("ambulance_data.pdf");
  };

  if (!ambulanceData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="contact-page">
        <div ref={componentRef} style={{ padding: "20px", width: "100%" }}>
          <h1>{dict.initAmbulance.yourAmbulance}</h1>
          <h4>{dict.configurationPage.pyschalEquipment.title}</h4>
          {renderTable(ambulanceData.pyschical)}
          <h4>{dict.configurationPage.medicalEquipment.title}</h4>
          {renderTable(ambulanceData.medical)}
          <h4>
            {dict.initAmbulance.totalPrice}
            {":"} {ambulanceData.totalPrice}$
          </h4>
        </div>
        <div className="d-flex justify-content-center w-100 gap-5">
          <Button variant="danger" onClick={handleDownloadPdf}>
            {dict.buttons.download}
          </Button>
          <Button variant="primary" onClick={() => setShowContactModal(true)}>
            {dict.buttons.contact}
          </Button>
        </div>
      </div>

      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{dict.buttons.contact}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FirmContactForm dict={dict} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactComp;



/* 
"use client";
import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import FirmContactForm from "@/components/contact/contactForm";

export const ContactComp = ({ dict }) => {
    const [ambulanceData, setAmbulanceData] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const componentRef = useRef();
  
    useEffect(() => {
      const savedData = localStorage.getItem("ambulanceData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const translatedData = translateKeys(parsedData);
        setAmbulanceData(translatedData);
      }
    }, []);
  
    const translateKeys = (data) => {
      const translatedPyschical = Object.fromEntries(
        Object.entries(data.pyschical).map(([key, value]) => [
          dict.initAmbulance.pyschical[key],
          value,
        ])
      );
      const translatedMedical = Object.fromEntries(
        Object.entries(data.medical).map(([key, value]) => [
          dict.initAmbulance.medical[key],
          value,
        ])
      );
      return {
        pyschical: translatedPyschical,
        medical: translatedMedical,
        totalPrice: data.totalPrice,
      };
    };
  
    const renderTable = (data) => {
      return (
        <Table striped bordered hover className="responsiveTable mb-3">
          <thead>
            <tr>
              <th className="text-center">{dict.common.equipment}</th>
              <th className="text-center">{dict.common.brand}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {Array.isArray(value) ? value.join(", ") : value.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    };
  
    const handleDownloadPdf = async () => {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        scrollY: -window.scrollY,
        useCORS: true,
      });
      const data = canvas.toDataURL("image/png");
  
      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait", // or 'landscape'
        unit: "mm",
        format: "a4", // A4 size
      });
  
      // Get canvas dimensions
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate image dimensions to fit the PDF page
      const imgWidth = pdfWidth;
      const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  
      // Add image to PDF
      pdf.addImage(data, "WEBP", 0, 0, imgWidth, imgHeight);
  
      // Add creation date
      const date = new Date().toLocaleDateString();
      pdf.text(`Created on: ${date}`, 10, pdfHeight - 10);
  
      pdf.save("ambulance_data.pdf");
    };
  
    if (!ambulanceData) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        <div className="contact-page">
          <div ref={componentRef} style={{ padding: "20px", width: "100%" }}>
            <h1>{dict.initAmbulance.yourAmbulance}</h1>
            <h4>{dict.configurationPage.pyschalEquipment.title}</h4>
            {renderTable(ambulanceData.pyschical)}
            <h4>{dict.configurationPage.medicalEquipment.title}</h4>
            {renderTable(ambulanceData.medical)}
            <h4>
              {dict.initAmbulance.totalPrice}
              {":"} {ambulanceData.totalPrice}$
            </h4>
          </div>
          <div className="d-flex justify-content-center w-100 gap-5">
          <Button  variant="danger" onClick={handleDownloadPdf}>{dict.buttons.download}</Button>
          <Button variant="primary" onClick={() => setShowContactModal(true)}>
            {dict.buttons.contact}
          </Button>
          </div>
         
        </div>
  
        <Modal
          show={showContactModal}
          onHide={() => setShowContactModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{dict.buttons.contact}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FirmContactForm dict={dict} />
          </Modal.Body>
        </Modal>
      </>
    );
  };
  export default ContactComp; */