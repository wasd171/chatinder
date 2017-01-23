import notifier from 'node-notifier'


export default function showNotification(event, {title, message}) {
    const options = {
        title,
        message,
        sound: true
    };

    notifier.notify(options);
}