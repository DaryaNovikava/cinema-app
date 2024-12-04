export function formatRuntime(runtime) {
    if (runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours} ч ${minutes} мин`;
    }
    else {
        return `-`;
    }
}
export default formatRuntime;
