export const loginUser = async (formData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application.json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = response.json();
      return data;
      
    } catch (err) {
      console.log("error", err); 
    }
  };
  