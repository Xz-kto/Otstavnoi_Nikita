function validation(form) {
    
    function removeError(input) {
        const errorLabel = input.parentNode.querySelector('.error-label');
        if (errorLabel) {
            errorLabel.remove();
            input.style.border = '';
        }
    }
    
    function createError(input, text) {
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
        input.style.border = 'solid red';
        input.parentNode.append(errorLabel);
    }
    
    function markSuccess(input) {
        input.style.border = 'solid green';
    }

    let result = true;
    const allInputs = form.querySelectorAll('input');

    for (const input of allInputs) {
        removeError(input);
        if (input.value === "") {
            createError(input, 'Заполните поле!');
            result = false;
        } else if ((input.id === "First" || input.id === "Last") && !/^[A-Za-zА-Яа-я]+$/.test(input.value)) {
            createError(input, 'Пожалуйста, используйте только буквы русского и английского алфавитов!');
            result = false;
        } else if (input.id === "Age") {
            const ageValue = parseInt(input.value, 10);
            if (ageValue < 16) {
                createError(input, 'Записаться на консультацию можно только с 16 лет!');
                result = false;
            } else {
                markSuccess(input);
            }
        } else if (input.id === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            createError(input, 'Некорректный формат электронной почты!');
            result = false;
        } else if (input.id === "Telephone" && !/^\d{3}-\d{3}-\d{2}-\d{2}$/.test(input.value)) {
            createError(input, 'Некорректный формат телефона! (ххх-ххх-хх-хх)');
            result = false;
        } else if (input.id === "qDate") {
            const dateValue = new Date(input.value);
            const year = dateValue.getFullYear();
            if (year !== 2024) {
                createError(input, 'Год указан неверно! Допустимое значение: 2024.');
                result = false;
            } else {
                markSuccess(input);
            }
        } else if (input.id === "qTime") {
            const timeValue = input.value;
            const [hours, minutes] = timeValue.split(':').map(Number);
            if (hours < 10 || hours > 20) {
                createError(input, 'Время указано неверно! Пожалуйста, укажите время в диапазоне с 10:00 до 20:00.');
                result = false;
            } else {
                markSuccess(input);
            }
        } else {
            markSuccess(input);
        }
    }

    return result;
}

document.getElementById('Form-2').addEventListener('submit', function(event) {
    event.preventDefault();
    const First = document.getElementById('First');
    const Last = document.getElementById('Last');
    const Age = document.getElementById('Age');
    const Gender = document.getElementById('Gender');
    const Email = document.getElementById('Email');
    const Telephone = document.getElementById('Telephone');
    const qDate = document.getElementById('qDate');
    const qTime = document.getElementById('qTime');

    if (validation(this) == true) {
        alert(`Заявка на консультацию отправлена, в ближайшее время с вами свяжется менеджер для ее подтверждения!\n
        Имя: ${First.value}\n
        Фамилия: ${Last.value}\n
        Возраст: ${Age.value}\n
        Пол: ${Gender.value}\n
        E-mail: ${Email.value}\n
        Телефон: ${Telephone.value}\n
        Дата: ${qDate.value}\n
        Время: ${qTime.value}`);
    }
});