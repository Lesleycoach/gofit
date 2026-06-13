
import { initializeApp } from "https://gstatic.com";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "https://gstatic.com";

const firebaseConfig = {
 apiKey: "AIzaSyAAcqYqNg_YGSdyxP62J9h4flBTP_GAYfE",
    authDomain: "lesley-fitness-c5e69.firebaseapp.com",
    projectId: "lesley-fitness-c5e69",
    storageBucket: "lesley-fitness-c5e69.firebasestorage.app",
    messagingSenderId: "1038090805569",
    appId: "1:1038090805569:web:f8600cb9fc5e0b9819c1c0",
    measurementId: "G-QZKKLV9B9X",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const USER_ID = "test_user_lesley"; 


export async function updateGoal(goal) {
    try {
        const userRef = doc(db, "users", USER_ID);
        await setDoc(userRef, { fitnessGoal: goal }, { merge: true });
        return true;
    } catch (e) {
        console.error("更新目標失敗:", e);
        return false;
    }
}


export async function addDietLog(calories, foodName = "未命名食物") {
    try {
        const userRef = doc(db, "users", USER_ID);
        await updateDoc(userRef, {
            dietLogs: arrayUnion({
                calories: Number(calories),
                food: foodName,
                timestamp: new Date()
            })
        });
        return true;
    } catch (e) {
    
        try {
            const userRef = doc(db, "users", USER_ID);
            await setDoc(userRef, {
                dietLogs: [{ calories: Number(calories), food: foodName, timestamp: new Date() }]
            }, { merge: true });
            return true;
        } catch (err) {
            console.error("飲食紀錄儲存失敗:", err);
            return false;
        }
    }
}

export async function addWeightLog(weight) {
    try {
        const userRef = doc(db, "users", USER_ID);
        await setDoc(userRef, { 
            currentWeight: Number(weight)
        }, { merge: true });
        
        await updateDoc(userRef, {
            weightHistory: arrayUnion({
                weight: Number(weight),
                timestamp: new Date()
            })
        });
        return true;
    } catch (e) {
        console.error("體重紀錄失敗:", e);
        return false;
    }
}


export async function checkIn(workoutType) {
    try {
        const userRef = doc(db, "users", USER_ID);
        await updateDoc(userRef, {
            checkInLogs: arrayUnion({
                workout: workoutType,
                timestamp: new Date()
            })
        });
        return true;
    } catch (e) {
        console.error("打卡失敗:", e);
        return false;
    }
}

