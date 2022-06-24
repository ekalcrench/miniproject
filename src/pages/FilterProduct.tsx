import React from "react";
import { useAppSelector } from "../app/hooks";
import NavbarComponent from "../component/NavbarComponent";

export default function FilterProduct() {
  // Redux
  const categoryGender = useAppSelector((state) => state.category.gender);
  const categoryType = useAppSelector((state) => state.category.type);
  
  console.log("categoryGender.length : ", categoryGender.length);
  console.log("categoryType : ", categoryType);
  return (
    <div>
      <NavbarComponent />
      <div>FilterProduct</div>
    </div>
  );
}
