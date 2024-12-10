import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Oeuvre from "./Oeuvre";
import OeuvreList from "./OeuvreList";

function OeuvreMain() {
  const { oeuvreId } = useParams();

  return (
    <div>
      {oeuvreId !== undefined || oeuvreId === "" ? <Oeuvre /> : <OeuvreList />}
    </div>
  );
}
