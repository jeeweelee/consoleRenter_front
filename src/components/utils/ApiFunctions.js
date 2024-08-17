import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

/* This function adds a new console to the database */
export async function addConsole(
  photo,
  consoleName,
  consoleType,
  consolePrice
) {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("consoleName", consoleName);
    formData.append("consoleType", consoleType);
    formData.append("consolePrice", consolePrice);

    const response = await api.post("/consoles/add", formData);
    return response.status === 201 || response.status === 200;
  } catch (error) {
    console.error("Error adding console:", error);
    return false;
  }
}

/* This function gets all console types from the database */
export async function getConsoleTypes() {
  try {
    const response = await api.get("/consoles/console/types");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    throw new Error("Error fetching console types");
  }
}
/*This function gets all consoles from database*/
export async function getAllConsoles() {
  try {
    const results = await api.get("/consoles/all-consoles");
    return results.data;
  } catch (error) {
    throw new Error("Error fetching consoles");
  }
}
/*This function deletes a console by id */
export async function deleteConsole(consoleId) {
  try {
    const result = await api.delete(`/consoles/delete/console/${consoleId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting console ${error.message}`);
  }
}
/*This function updates a console*/
export async function updateConsole(consoleId, consoleData) {
  try {
    const response = await api.put(
      `/consoles/update/${consoleId}`,
      consoleData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Assuming the server returns updated data
  } catch (error) {
    throw new Error(`Error updating console: ${error.message}`);
  }
}
/*This function gets a console by id */
export async function getConsoleById(consoleId) {
  try {
    const result = await api.get(`/consoles/console/${consoleId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching console: ${error.message}`);
  }
}
/*This function saves a new renting to the database*/
export async function rentConsole(consoleId, renting) {
  try {
    const response = await api.post(
      `/rentings/console/${consoleId}/renting`,
      renting
    );
    console.log(response.data);
    return response.data.confirmationCode;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || error.response.data);
    } else {
      throw new Error(`Error renting console: ${error.message}`);
    }
  }
}

/*This function gets all rented consoles from database*/
export async function getAllRentings() {
  try {
    const result = await api.get("/rentings/all-rentings");
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching rentings : ${error.message}`);
  }
}

/*This function gets rented consoles by confirmation code */
export async function getRentingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`rentings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error finding renting : ${error.message}`);
    }
  }
}

/*This function cancels/deletes the renting from database */
export async function cancelRenting(rentingId) {
  try {
    const result = await api.delete(`rentings/renting/${rentingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error canceling booking : ${error.message}`);
  }
}
