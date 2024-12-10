"use client";
import Puuid from "@/components/puuid";

export default function Page() {
  return (
    <div>
      <div className="flex justify-center mt-16">
        <div className="container">
          <p className="flex justify-center font-sans text-2xl mb-6">wow</p>
          <div>
            <Puuid />
          </div>
        </div>
      </div>
    </div>
  );
}
