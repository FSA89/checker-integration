
// services/handleErrors.js

export function handleErrors(error) {
    console.error("Произошла ошибка:", error);

    alert("Произошла ошибка при загрузке данных. Попробуйте снова.");

    sendErrorToServer(error);
}

function sendErrorToServer(error) {
    fetch('/log-error', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: error.message, stack: error.stack })
    });
}
