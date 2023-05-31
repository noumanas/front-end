import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config as URLconfig } from "../enviorment/enviorment";
import { getItemToLocalStorage } from "../services/storage";

const usePDF = () => {
  const [isPending, setIsPending] = useState(false);

  function generatePDF(payload) {
    setIsPending(true);

    const storedToken = getItemToLocalStorage("accessToken");

    axios
      .post(`${URLconfig.BASE_URL}/pdf-generate`, payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(async (response) => {
        let result = response.data.data;
        window.location.replace(result.url);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  useEffect(() => {}, []);

  return {
    downloadPDF: (metaData) => generatePDF(metaData),
    isPending: isPending,
  };
};

export default usePDF;
