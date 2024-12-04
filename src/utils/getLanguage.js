export function getLanguage(language) {
    const languageMap = {
        en: "Английский",
        kn: "Каннада",
        tl: "Тагальский",
        nl: "Нидерландский",
        fr: "Французский",
        es: "Испанский",
        ja: "Японский",
        zh: "Китайский",
        fa: "Персидский",
        bn: "Бенгальский",
        ko: "Корейский",
    };
    return languageMap[language] || "Неизвестный язык";
}
