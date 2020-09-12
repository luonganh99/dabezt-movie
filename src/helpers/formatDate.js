export default function formatDate(date) {
    return date.split('-').reverse().join('/');
}
