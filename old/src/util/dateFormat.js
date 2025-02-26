export function formatDate(date) {
    if(!date)
        return ""
    const formattedDate = new Date(date);
    const formattedDateString = formattedDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedTimeString = formattedDate.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric', hour12: false });
    return `${formattedDateString} ${formattedTimeString}`;
}