    import gpss from "../../assets/icons/gpss.png"
    import call from "../../assets/icons/call.png"
    import watch from "../../assets/icons/watch.png"
    import mcal from "../../assets/icons/mcal.png"
    const Storeinfo = () =>{
        const textcss = "rounded-xl pl-1 pr-1 border-1 border-black/20 text-black text-xs";
        const textcss2 ="text-xs text-black/40 text-bold";
        return(
            <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">달콤한 베이커리</h2>
                        <div className="ml-80">
                            <span className="text-yellow-500 font-semibold">★ 4.8</span>
                            <span className="text-xs text-gray-400">(342)</span>
                        </div>
                    </div>
                <div className="text-sm text-gray-500 mb-2">프리미엄 수제 케이크 전문점</div>
                <div className="flex flex-row mt-5 gap-1">
                    <div className={`${textcss}`}>생일케이크</div>
                    <div className={`${textcss}`}>주문제작</div>
                    <div className={`${textcss}`}>당일픽업</div>
                </div>
                <div className="text-gray-600 mt-5 text-xs mb-4">
                    2015년부터 일산에서 사랑받아온 프리미엄 수제 케이크 전문점입니다.
                    신선한 재료와 정성으로 특별한 날을 더욱 특별하게 만들어 드립니다.
                </div>
                <div className="text-sm border-t border-gray-200">
                    <div className="mt-3">
                        <ul className="flex flex-col gap-3 p-0">
                            <li className="flex flex-row">
                                <div><img src={gpss} alt="" /></div>
                                <div className="flex flex-col pl-2">
                                    <p className={`${textcss2}`}>주소</p>
                                    <p>일산 정발산동 123-45</p> 
                                </div>
                            </li>
                            <li className="flex flex-row">
                                <div><img src={call} alt="" /></div>
                                <div className="flex flex-col pl-2">
                                    <p className={`${textcss2}`}>전화번호</p>
                                    <p>031-1234-5678</p> 
                                </div>
                            </li>
                            <li className="flex flex-row">
                                <div><img src={watch} alt="" /></div>
                                <div className="flex flex-col pl-2">
                                    <p className={`${textcss2}`}>영업시간</p>
                                    <p>매일 10:00 - 21:00</p> 
                                </div>
                            </li>
                            <li className="flex flex-row border-b-1 border-gray-200">
                                <div><img src={mcal} alt="" /></div>
                                <div className="flex flex-col pl-2">
                                    <p className={`${textcss2}`}>픽업안내</p>
                                    <p>정해진 예약 시간에 맞춰주시면 감사하겠습니다!!</p> 
                                    <p className="underline text-xs text-blue-500 mb-5">당일 예약 가능합니다!</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-black/80">
                    픽업 주문하기
                </button>
                </div>
        );
    };

    export default Storeinfo;