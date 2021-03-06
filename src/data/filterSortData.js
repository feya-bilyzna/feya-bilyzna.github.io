const filterSortData = {
    sorters: {
        priceLabel: "Сортировка",
        price: [
            { value: "", label: "Новинки" },
            { value: "CHEAPEST", label: "Цена по возрастанию" },
            { value: "EXPENSIVE", label: "Цена по убыванию" },
        ],
    },
    filters: {
        cupSizesLabel: "Выбрать чашку",
        cupSizes: [
            { value: "", label: "Всё" },
            { value: "A", label: "" },
            { value: "B", label: "" },
            { value: "C", label: "" },
            { value: "D", label: "" },
            { value: "E", label: "" },
            { value: "F", label: "" },
            { value: "G", label: "" },
            { value: "H", label: "" },
        ],
        bandSizesLabel: "Выбрать обхват",
        bandSizes: [
            { value: "", label: "Всё" },
            { value: "70", label: "" },
            { value: "75", label: "" },
            { value: "80", label: "" },
            { value: "85", label: "" },
            { value: "90", label: "" },
            { value: "95", label: "" },
            { value: "100", label: "" },
            { value: "105", label: "" },
            { value: "110", label: "" },
        ],
        knickersSizesLabel: "Выбрать размер",
        knickersSizes: [
            { value: "", label: "Всё" },
            { value: "L", label: "" },
            { value: "XL", label: "" },
            { value: "2XL", label: "" },
            { value: "3XL", label: "" },
            { value: "4XL", label: "" },
            { value: "5XL", label: "" },
            { value: "7XL", label: "" },
            { value: "8XL", label: "" },
            { value: "9XL", label: "" },
        ],
        colorsLabel: "Выбрать цвет",
        colors: [
            { value: "", label: "Всё" },
            { value: "red", label: "Красный" },
            { value: "pink", label: "Розовый" },
            { value: "purple", label: "Фиолетовый" },
            { value: "deep-purple", label: "Темно-Фиолетовый" },
            { value: "indigo", label: "Темно-Синий" },
            { value: "blue", label: "Синий" },
            { value: "light-blue", label: "Голубой" },
            { value: "cyan", label: "Зелёно-Голубой" },
            { value: "teal", label: "Бирюзовый" },
            { value: "green", label: "Зелёный" },
            { value: "light-green", label: "Светло-Зелёный" },
            { value: "lime", label: "Лимонный" },
            { value: "yellow", label: "Желтый" },
            { value: "amber", label: "Янтарный" },
            { value: "orange", label: "Оранжевый" },
            { value: "deep-orange", label: "Тёмно-Оранжевый" },
            { value: "brown", label: "Коричневый" },
            { value: "grey", label: "Серый" },
            { value: "blue-grey", label: "Холодный-Серый" },
            { value: "black", label: "Черный" },
            { value: "white", label: "Белый" },
        ],
    }
}

export default filterSortData
