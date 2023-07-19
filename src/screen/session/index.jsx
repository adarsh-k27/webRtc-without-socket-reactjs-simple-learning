import React from "react";

export default function SessionDesc({ type, value, setValue }) {
  const HandleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        value={value}
        placeholder={
          type === "offer"
            ? "Enter Here Your Offer SDP"
            : "Enter Here Your Answer SDP"
        }
        onChange={HandleChange}
      ></textarea>
    </div>
  );
}
