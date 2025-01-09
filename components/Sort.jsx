"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AddItem from "./AddItem";
import { toast } from "@/hooks/use-toast";

function sort({ onSortChange }) {
  const [sortType, setSortType] = useState("");

  const handleSortChange = (value) => {
    console.log("hhhhhhhhhhhh");
    setSortType(value);
    onSortChange(value);
  }; 

  const shareList=()=>{
    toast({
        description: "the post shared succussfuly",
        className: "bg-green-500 text-white p-4 rounded shadow-lg",
      });
  }
  return (
    <div className="w-full flex justify-between ">
      <div className="flex gap-2 btn">
        <AddItem />
        <Button
          className="bg-orange-500 text-white hover:bg-orange-600  sm:w-auto "
          onClick={shareList}
        >
          Share
        </Button>
      </div>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Recently</SelectItem>

          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="category">Category</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default sort;
