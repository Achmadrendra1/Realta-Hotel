import { Card } from "antd";
import React from "react";

export default function DetCard() {
  return (
    <div className="h-44 w-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Card
        bordered={true}
        // onClick={() => setOpenDetCard(true)}
        className="cursor-pointer"
      >
        <div className="flex justify-between">
          <p className="text-2xl font-bold">**** 1345</p>
          <p className="font-bold">Credit Card</p>
        </div>
        <p className="mt-12">01/2027</p>
        <div className="flex justify-between">
          <p className="font-bold text-lg">Achmad Rendra</p>
          <p>MANDIRI</p>
        </div>
      </Card>
    </div>
  );
}
