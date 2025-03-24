"use client";
/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

const StudentCard = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group mb-4">
      {/* Card Image */}
      {student.imageUrl ? (
        <img className="w-full" src={student.imageUrl} alt={"title"} />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-700">
            {student.name.split(" ")[0]}
          </span>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">Open</span>
      </div>

      {/* Card Content */}
      {/* <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{student.name}</div>
        <p className="text-gray-700 text-base">{student.thoughts}</p>
      </div> */}
    </div>
  );
};

export default StudentCard;
