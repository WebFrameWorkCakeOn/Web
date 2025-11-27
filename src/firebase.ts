// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFiAv1qpMQhfIvtHfV8XQxMyrXVkPVXzo",
  authDomain: "cakeon-47df2.firebaseapp.com",
  projectId: "cakeon-47df2",
  storageBucket: "cakeon-47df2.firebasestorage.app",
  messagingSenderId: "417224197014",
  appId: "1:417224197014:web:e49047dafb14f6fce293b7",
  measurementId: "G-7YTEZ42CPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 초기화된 app 인스턴스를 기반으로 Storage 서비스 인스턴스를 생성.
// 이후 파일 업로드/다운로드는 이 storage 인스턴스를 통해 이뤄진다.
export const storage = getStorage(app);

// 초기화된 app 인스턴스를 기반으로 Firestore DB 인스턴스를 생성.
// 이후 문서 추가/조회/수정/삭제 작업은 이 db 인스턴스를 통해 이뤄진다.
export const db = getFirestore(app);
// Analytics 통계용 서비스 초기화 (필수 아님, 통계쓰려면만)
// const analytics = getAnalytics(app);
