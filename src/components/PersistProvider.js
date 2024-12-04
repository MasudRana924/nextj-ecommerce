// components/PersistProvider.js
"use client"; // This is necessary to mark this as a client component

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store"; // Ensure the correct path to your store

export default function PersistProvider({ children }) {
  return <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>;
}
