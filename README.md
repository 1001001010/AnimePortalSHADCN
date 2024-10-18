**Установка**
- Установить PHP <a>https://www.php.net/downloads</a>
- Установить Nodejs <a>https://nodejs.org/en/download</a> **Не меньше 19 версии**
- Установить Composer <a>https://getcomposer.org/</a>
- Клонировать репозиторий `git clone <link>`
- Скачать модули node `npm install`
- Установить composer `Composer i`
---
**Запуск**
- Создать файл конфигурации с примера `Copy .env.example .env`
*Файл .env* <br> - Отредактировать файл конфигурации
>pusher.com
![image](https://github.com/user-attachments/assets/7046d8b0-8af0-47a4-888c-1a51cd3294e1)

>mailgun.com <br>
![image](https://github.com/user-attachments/assets/251513ba-5b8d-4976-aa9e-deeb2d9f3533)

>oauth.yandex.ru <br>
![image](https://github.com/user-attachments/assets/44af8a72-e703-4729-81a4-fa84b73ef40f)

- Создать ключ приложения `php artisan key:generate`
- Мигрировать таблицы `php artisan migrate`
- Запустить приложения `npm run dev` и `php artisan serve`

--- 
Используемый стек: 
* Laravel
* React
* TypeScript
* Tailwind
* Shadcn
