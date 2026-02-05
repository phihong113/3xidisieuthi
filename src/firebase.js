// Import các hàm cần thiết từ thư viện Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyC98FR84BskvQ2enlK3d7ZAKGg7b9Qlchk",
  authDomain: "xidisieuthi.firebaseapp.com",
  projectId: "xidisieuthi",
  storageBucket: "xidisieuthi.firebasestorage.app",
  messagingSenderId: "145965144546",
  appId: "1:145965144546:web:7df709cf27ac2132e841bb",
  measurementId: "G-8DLHYJG86H" // Có thể giữ hoặc bỏ đều được
};

// Khởi tạo Firebase và Firestore Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };