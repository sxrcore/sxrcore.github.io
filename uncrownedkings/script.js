```javascript
// ==========================================
// DISCORD INVITE
// ==========================================

const DISCORD_INVITE = "https://discord.gg/MMnEpJpXeS";


// ==========================================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// ==========================================

const serverName =
    document.getElementById("serverName");

const serverIcon =
    document.getElementById("serverIcon");

const members =
    document.getElementById("members");

const online =
    document.getElementById("online");

const status =
    document.getElementById("status");

const statusText =
    document.getElementById("statusText");


// ==========================================
// ПОЛУЧАЕМ КОД ИЗ ССЫЛКИ
// ==========================================

function getInviteCode(url) {

    return url
        .split("/")
        .filter(Boolean)
        .pop();

}


// ==========================================
// ЗАГРУЗКА СТАТИСТИКИ
// ==========================================

async function loadServer() {

    try {

        const inviteCode =
            getInviteCode(DISCORD_INVITE);


        /*
         * Discord Invite API
         *
         * Всё берём по invite-ссылке.
         * ID сервера вручную не указываем.
         */

        const apiUrl =
            `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`;


        const response =
            await fetch(apiUrl);


        if (!response.ok) {

            throw new Error(
                `Discord API: ${response.status}`
            );

        }


        const data =
            await response.json();


        // ======================================
        // НАЗВАНИЕ
        // ======================================

        if (data.guild?.name) {

            serverName.textContent =
                data.guild.name;

        }


        // ======================================
        // УЧАСТНИКИ
        // ======================================

        if (
            typeof data.approximate_member_count
            === "number"
        ) {

            members.textContent =
                data.approximate_member_count
                    .toLocaleString("ru-RU");

        }


        // ======================================
        // ОНЛАЙН
        // ======================================

        if (
            typeof data.approximate_presence_count
            === "number"
        ) {

            online.textContent =
                data.approximate_presence_count
                    .toLocaleString("ru-RU");

        }


        // ======================================
        // ИКОНКА
        // ======================================

        if (
            data.guild?.id &&
            data.guild?.icon
        ) {

            const icon =
                data.guild.icon;

            const extension =
                icon.startsWith("a_")
                    ? "gif"
                    : "png";


            serverIcon.src =
                `https://cdn.discordapp.com/icons/` +
                `${data.guild.id}/` +
                `${icon}.${extension}?size=256`;

        }


        // ======================================
        // СТАТУС
        // ======================================

        status.classList.remove("offline");

        statusText.textContent =
            "Сервер работает";


        console.log(
            "Discord data:",
            data
        );


    } catch (error) {

        console.error(
            "Не удалось получить Discord:",
            error
        );


        members.textContent = "—";
        online.textContent = "—";


        status.classList.add("offline");

        statusText.textContent =
            "Не удалось загрузить";
    }

}


// ==========================================
// ЗАПУСК
// ==========================================

loadServer();


// ==========================================
// ОБНОВЛЕНИЕ КАЖДУЮ МИНУТУ
// ==========================================

setInterval(
    loadServer,
    60 * 1000
);
```
