import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils /API";
import "./deleteSpotBtn.css";

function DeleteSpotBtn({ spotId }) {
  const deleteSpot = () => {
    const { data } = API.deleteSpot(spotId);
    window.location.reload();
    console.log(spotId);
  };
  return (
    <div>
      <Button
        variant="danger"
        onClick={() => deleteSpot()}
        className="dash__delete-btn"
      >
        X
      </Button>
    </div>
  );
}

export default DeleteSpotBtn;
