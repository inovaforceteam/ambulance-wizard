export const sendContactForm = async (formData) => {
  console.log(formData)
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(formData)

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || "Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in sendContactForm:", error);
    throw error;
  }
};

  