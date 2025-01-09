"use client"
import ItemList from "@/components/ItemList";
import Sort from "../components/Sort"
import { useState } from "react";
export default function Home() {
  const [sortType, setSortType] = useState("");
  return (
    <div >
<>
<Sort onSortChange={setSortType}/>
<ItemList sortType={sortType}/>

</>
    </div>
  );
}
