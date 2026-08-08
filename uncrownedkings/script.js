```javascript
const DISCORD_INVITE = "MMnEpJpXeS";

const serverName = document.getElementById("serverName");
const serverIcon = document.getElementById("serverIcon");

const members = document.getElementById("members");
const online = document.getElementById("online");

const status = document.getElementById("status");
const statusText = document.getElementById("statusText");


async function loadServer() {

    try {

        /*
         * Получаем информацию по приглашению Discord.
         *
         * with_counts=true нужен для получения:
         * - количества участников
         * - количества онлайн
         */

        const response = await fetch(
            `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`
        );

        if (!response.ok) {
            throw new Error(
                `Discord API returned ${response.status}`
            );
        }

        const data = await response.json();


        /*
         * Название сервера
         */

        if (data.guild?.name) {
            serverName.textContent = data.guild.name;
        }


        /*
         * Количество участников
         */

        if (
            typeof data.approximate_member_count === "number"
        ) {

            members.textContent =
                data.approximate_member_count
                    .toLocaleString("ru-RU");

        } else {

            members.textContent = "—";
        }


        /*
         * Количество онлайн
         */

        if (
            typeof data.approximate_presence_count === "number"
        ) {

            online.textContent =
                data.approximate_presence_count
                    .toLocaleString("ru-RU");

        } else {

            online.textContent = "—";
        }


        /*
         * Иконка сервера
         */

        if (data.guild?.id && data.guild?.icon) {

            const iconHash = data.guild.icon;

            const extension =
                iconHash.startsWith("a_")
                    ? "gif"
                    : "png";

            serverIcon.src =
                `https://cdn.discordapp.com/icons/` +
                `${data.guild.id}/` +
                `${iconHash}.${extension}?size=256`;
        }


        /*
         * Сервер доступен
         */

        status.classList.remove("offline");

        statusText.textContent =
            "Сервер работает";


    } catch (error) {

        console.error(
            "Ошибка Discord:",
            error
        );


        /*
         * Если Discord не ответил
         */

        members.textContent = "—";
        online.textContent = "—";

        status.classList.add("offline");

        statusText.textContent =
            "Сервер недоступен";
    }
}


/*
 * Загружаем данные сразу
 */

loadServer();


/*
 * Обновляем статистику
 * каждые 60 секунд
 */

setInterval(
    loadServer,
    60 * 1000
);
```
