"use client"
import React from 'react';

const PriceSummary = () => {
    const total = 2600; // This could be dynamically calculated based on selected items.

    const viewList = () => {
        // Logic to display the list of selected items
        console.log("Displaying list...");
    };

    const contactUs = () => {
        // Logic to initiate contact, such as opening a contact form or redirecting to a contact page
        console.log("Going to contact page...");
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h2>TOTAL: ${total}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button onClick={viewList} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Listeyi Görüntüle</button>
                <button onClick={contactUs} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>İletişime Geç</button>
            </div>
        </div>
    );
};

export default PriceSummary ;

