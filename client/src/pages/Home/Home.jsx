import "@livekit/components-styles";
import React, { useState } from "react";
import { PreJoin } from "@livekit/components-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const handleSubmit = (x) => {
    navigate("/video-calling", { state: { data: x } });

    setToken(token);
  };

  return <PreJoin onSubmit={handleSubmit} />;
}
