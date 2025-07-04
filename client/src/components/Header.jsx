import React from "react";

export default function Header({title, description}) {
  return (
    <section
        className="text-white text-center py-2"
        style={{ backgroundColor: "#df48f3" }}
      >
        <h1 className="display-4">{title}</h1>
        <p className="lead">{description}</p>
      </section>
  );
}
