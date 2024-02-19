"use client";
import { useUser } from "@/context/UserContext";
import { ProfilePageLayout } from "@/layouts/ProfilePageLayout";
import Image from "next/image";
import { useEffect } from "react";

import api from "@/utils/api";

const ProfilePage = () => {
  const { user } = useUser();

  // dummy data for the profile, interests should be replaced with interests the user specified during registration
  const profileData = {
    name: "Ayoola Adewale",
    email: "ayoola@example.com",
    phoneNumber: "+234 802 345 6789",
    profilePicture: "/odumodu4.jpg",
    interests: [
      "Football",
      "Basketball",
      "Cricket",
      "Cooking",
      "Skating",
      "Recording",
      "Travel",
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/profile");

      console.log(response);
    };

    fetchData();
  }, []);

  return (
    <ProfilePageLayout>
      <div className="min-h-screen  flex flex-col items-center justify-center space-y-6 mb-20 md:mb-0">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={profileData.profilePicture}
            alt="Profile"
            layout="responsive"
            objectFit="cover"
            width={100}
            height={100}
          />
        </div>

        {/* Personal Details */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{profileData.name}</h1>
          <p className="text-gray-500">Username: {user?.data?.username}</p>
          <p className="text-gray-500">
            {user?.data?.email || profileData.email}
          </p>
          <p className="text-gray-500">
            {user?.data?.phoneNumber || profileData.phoneNumber}
          </p>
        </div>

        {/* Interests */}
        <div className="text-center space-y-5 w-full">
          <h2 className="text-lg font-semibold">Interests</h2>
          <div className="flex justify-center">
            <ul className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {user?.data?.interests.map((interest: any, index: any) => (
                <li
                  key={index}
                  className="flex justify-center items-center bg-gray-200  py-2 px-4 rounded-full"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
