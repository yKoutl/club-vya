export const createMarkup = (html) => ({ __html: html });

export const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Hace un momento';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Hace un momento';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} h`;
    return `Hace ${Math.floor(seconds / 86400)} días`;
};

export const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('es-PE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};
