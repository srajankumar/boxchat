"use client";

import { useState } from "react";
import Navbar from "@/components/Main/Navbar";
import { Button } from "@/components/ui/button";
import { BoxSelectIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import Hero from "@/components/Main/Hero";
import Footer from "@/components/Main/Footer";
import Features from "@/components/Main/Features";

const Home = () => {
  const [boxName, setBoxName] = useState("");

  const handleRedirect = () => {
    if (boxName.trim()) {
      window.location.href = `/box/${boxName.trim()}`;
    }
  };
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
