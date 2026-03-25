import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicleName }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate("/quote", { state: { selectedVehicle: vehicleName } });
  };

  return (
    <button
      onClick={handleSelect}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
    >
      {vehicleName}
    </button>
  );
};