```javascript
const DISCORD_INVITE = "MMnEpJpXeS";

const serverName = document.getElementById("serverName");
const serverIcon = document.getElementById("serverIcon");
const members = document.getElementById("members");
const online = document.getElementById("online");
const status = document.getElementById("status");
const statusText = document.getElementById("statusText");

async function loadServer() {
    console.log("1. script.js работает");

    const apiUrl =
        `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`;

    console.log("2. Запрос:", apiUrl);

    try {
        const response = await fetch(apiUrl);

        console.log("3. Ответ Discord:", response.status);

        if (!response.ok) {
            throw new Error(`Discord HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log("4. Данные Discord:", data);

        if (!data.guild) {
            throw new Error("Discord не вернул guild");
        }

        // Название
        serverName.textContent = data.guild.name;

        // Участники
        members.textContent =
            Number(data.approximate_member_count)
                .toLocaleString("ru-RU");

        // Онлайн
        online.textContent =
            Number(data.approximate_presence_count)
                .toLocaleString("ru-RU");

        // Иконка
        if (data.guild.icon) {
            const extension =
                data.guild.icon.startsWith("a_")
                    ? "gif"
                    : "png";

            serverIcon.src =
                `https://cdn.discordapp.com/icons/` +
                `${data.guild.id}/` +
                `${data.guild.icon}.${extension}?size=256`;
        }

        // Статус
        status.classList.remove("offline");
        statusText.textContent = "Сервер работает";

        console.log("5. Всё успешно!");

    } catch (error) {

        console.error("ОШИБКА:", error);

        status.classList.add("offline");
        statusText.textContent = "Ошибка загрузки";

        members.textContent = "—";
        online.textContent = "—";
    }
}

loadServer();

setInterval(loadServer, 60000);
```
