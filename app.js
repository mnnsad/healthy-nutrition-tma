// инициализация с TG
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

const recipes = [
    {
        id: 1,
        name: "Тост с авокадо и яйцом",
        description: "Питательный завтрак с полезными жирами",
        calories: 350,
        protein: 15,
        fat: 20,
        carbs: 25,
        ingredients: ["Хлеб цельнозерновой", "Авокадо", "Яйцо", "Специи"]
    },
    {
        id: 2,
        name: "Овощной салат с киноа",
        description: "Полезный и легкий обед",
        calories: 280,
        protein: 12,
        fat: 8,
        carbs: 35,
        ingredients: ["Киноа", "Огурцы", "Помидоры", "Зелень", "Оливковое масло"]
    },
    {
        id: 3,
        name: "Куриная грудка с овощами",
        description: "Белковый ужин для мышц",
        calories: 320,
        protein: 35,
        fat: 8,
        carbs: 15,
        ingredients: ["Куринная грудка", "Брокколи", "Морковь", "Специи"]
    },
    {
        id: 4,
        name: "Лосось на пару",
        description: "Источник омега-3 кислот",
        calories: 280,
        protein: 25,
        fat: 18,
        carbs: 5,
        ingredients: ["Лосось", "Лимон", "Укроп", "Оливковое масло"]
    },
    {
        id: 5,
        name: "Гречневая каша",
        description: "Энергичный завтра с медленными углеводами",
        calories: 220,
        protein: 8,
        fat: 4,
        carbs: 40,
        ingredients: ["Гречка", "Вода", "Соль", "Зелень"]
    }
];

//
function initTabs() {
    console.log('TMA: Инициализация табов');

    const tabs = document.querySelectorAll('.tab');
    if (tabs.length === 0) {
        console.error('TMA: Табы не найдены');
        return;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('TMA: Клик по табу', this.getAttribute('data-tab'));

            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });

             document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);

            if (tabContent) {
                tabContent.classList.add('active');

                if (tabId === 'recipes') {
                    loadRecipes();
                }
            }
            else {
                console.error('TMA: Контент таба не найден', tabId);
            }
        });
    });

    console.log('TMA: Табы инициализированы');
}

//загрузка рецептов
function loadRecipes() {
    const recipesList = document.getElementById('recipes-list');
    if (!recipesList) return;
    
    recipesList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <div class="recipe-macros">
                <p>${recipe.calories} ккал | ${recipe.protein}г | ${recipe.fat} | ${recipe.carbs}г</p>
            </div>
            <div class="recipe-ingredients">
                <strong>Ингредиенты:</strong> ${recipe.ingredients.join(', ')}
            </div>
        `;
        recipesList.appendChild(recipeCard);
    });
}

//калькулятор кбжу
function initCalculator() {
    console.log('TMA: Инициализация калькулятора');

    const calculateBtn = document.getElementById('calculate');
    if (!calculateBtn) {
        console.error('TMA: Кнопка расчета не найдена');
        return;
    }
    
    calculateBtn.addEventListener('click', calculateMacros);
    console.log('TMA: Калькулятор инициализирован');
}

function calculateMacros() {
    const age = parseInt(document.getElementById('age').value) || 18;
    const weight = parseInt(document.getElementById('weight').value) || 65;
    const height = parseInt(document.getElementById('height').value) || 175;
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (!weight || !height || !age) {
        alert('Все поля должны быть заполнены');
        return;
    }

    //базовый метаболизм
    let bmr;
    if (gender == 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    //суточная норма калорий
    const calories = Math.round(bmr * activity);

    //расчет бжу
    const protein = Math.round(weight * 1.5);
    const fat = Math.round(weight * 0.8);
    const carbs = Math.round((calories * 0.5) / 4);
    
    //
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Ваша суточная норма</h3>
        <div class="macro">
            <span>Калории:</span>
            <strong>${calories} ккал</strong>
        </div>
        <div class="macro">
            <span>Белки:</span>
            <strong>${protein} г</strong>
        </div>
        <div class="macro">
            <span>Калории:</span>
            <strong>${fat} г</strong>
        </div>
        <div class="macro">
            <span>Калории:</span>
            <strong>${carbs} г</strong>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            Рекомендация: распределите приемы пищи на 3-5 раз в день
        </div>
    `;
}