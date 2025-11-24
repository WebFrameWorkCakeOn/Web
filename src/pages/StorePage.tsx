//import React from "react";

import Storebar from "../components/Store/Storebar"
import Storeimage from "../components/Store/Storeimage"
import Storeinfo from "../components/Store/Storeinfo"
import Storefp from "../components/Store/Storepf";

const StorePage = () =>{
    
    return (
    <div className="w-max-full min-h-screen p-4 bg-white rounded shadow">
        <Storebar />
        <div className="mt-10 flex gap-5">
        {/* 이미지 영역 */}
            <Storeimage />
        {/* 정보 영역 */}
            <Storeinfo />
        </div>
        {/* 하단 카테고리/포트폴리오 영역 */}
        <Storefp />
    </div>
  );
}

export default StorePage;