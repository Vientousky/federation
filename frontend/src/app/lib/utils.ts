export const generatePagination = (currentPage: number, totalPages: number) => {
    //cambiar totalPages a 15 cuando la prueba alla terminado
    if(totalPages <= 4) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if(currentPage <= 3 ) {
        return[1,2,3, '...', totalPages - 1, totalPages];
    }

    //si es ultimos valores muestra 1 2
    if(currentPage >= totalPages - 2) {
        return[1,2,'...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ]
}