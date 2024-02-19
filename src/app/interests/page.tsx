"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}
interface InterestPageProps {
  registrationData: FormData;
  phoneNumber: string | undefined;
}
const InterestPage: React.FC<InterestPageProps> = ({
  registrationData,
  phoneNumber,
}) => {
  const interestsList = [
    "Football",
    "Basketball",
    "Hockey",
    "Cricket",
    "Cycling",
    "Swimming",
    "Golf",
    "Climbing",
    "Baseball",
    "Volleyball",
    "Soccer",
    "Tennis",
    "Gymnastics",
    "Dance",
    "Rugby",
    "Boxing",
    "Wrestling",
    "Cooking",
    "Gardening",
    "Recording",
    "Reading",
    "Travel",
    "Yoga",
    "Music",
    "Painting",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Toggle the selection of interests
  const handleInterestClick = (interest: never) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/auth/create", {
        email: registrationData.email,
        phoneNumber: phoneNumber,
        password: registrationData.password,
        interests: selectedInterests,
      });

      //redirect
      router.push("/verify-email");
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  const itemsPerRow = [12];
  return (
    <>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}
      <div className="flex flex-col items-center h-[calc(100vh-120px)] space-y-6 justify-center md:px-40">
        <h2 className="flex justify-center text-2xl ">Select Your Interests</h2>
        <div className="flex flex-wrap">
          {interestsList.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestClick(interest as never)}
              style={{
                backgroundColor: selectedInterests.includes(interest as never)
                  ? "lightgreen"
                  : "lightgray",
                padding: "8px",
                margin: "4px",
                borderRadius: "4px",
                flex: `1 0 calc(${100 / Math.max(...itemsPerRow)}% - 8px)`,
              }}
            >
              {interest}
            </button>
          ))}
        </div>
        <button
          className={`${
            loading && "opacity-50"
          } bg-blue-500 text-white font-bold py-2 px-10 rounded`}
          onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default InterestPage;
