// src/utils/metrics.ts
// 📏 هذا الملف يحتوي على دوال تساعدنا على جعل الأحجام متجاوبة مع كل الشاشات.

import { Dimensions } from 'react-native';

// 🖥️ نحصل على أبعاد شاشة الهاتف الحالي (مثل Redmi Note 11)
const { width, height } = Dimensions.get('window');

// 🧱 هذه الأبعاد الأساسية التي صممنا عليها (نستخدم iPhone 11 كمقاس أساسي للتصميم)
const guidelineBaseWidth = 375;  // عرض شاشة التصميم
const guidelineBaseHeight = 812; // ارتفاع شاشة التصميم

// 📏 scale: لتغيير الحجم حسب عرض الشاشة
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

// 📏 verticalScale: لتغيير الحجم حسب ارتفاع الشاشة
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

// 📏 moderateScale: لتغيير الحجم بشكل متوسط (مثالي للخطوط والتفاصيل الصغيرة)
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// 📐 نُصدّر أيضًا عرض وارتفاع الشاشة لو احتجناهم مباشرة في أي مكان
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
