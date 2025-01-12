module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Указываем пути к файлам с разметкой
  theme: {
    container: {
      center: true, // Центрируем контейнер
      padding: {
        DEFAULT: "1rem", // Отступы по умолчанию (16px)
        sm: "2rem",      // Отступы для маленьких экранов (32px)
        lg: "4rem",      // Отступы для больших экранов (64px)
        xl: "5rem",      // Отступы для экранов XL (80px)
        "2xl": "6rem",   // Отступы для экранов 2XL (96px)
      },
      screens: {
        sm: "100%", // Полная ширина на маленьких экранах
        md: "728px", // Максимальная ширина для medium
        lg: "984px", // Максимальная ширина для large
        xl: "1240px", // Максимальная ширина для extra large
        "2xl": "1440px", // Максимальная ширина для 2x extra large
      },
    },
    extend: {},
  },
  plugins: [],
};
