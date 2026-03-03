export const DEFAULT_CONFIG = {
    heroSub: "Sangre Azul y Oro", 
    heroTitle: "CLUB DEPORTIVO <br><span class=\"text-outline\">VYA</span>", 
    heroText: "El gigante de Villa María del Triunfo. Defendiendo nuestros colores con pasión, garra y fútbol desde 1983.",
    statV1: "1983", statT1: "Año de Fundación", 
    statV2: "+1.3K", statT2: "Hinchas Fieles", 
    statV3: "1", statT3: "Campeonato '25",
    idTitle: "Más que un club,<br>una <span class=\"text-[#1a5bb8]\">familia</span>.", 
    idP1: "El <strong>CD VyA</strong> no es solo un equipo que entra a la cancha 11 contra 11. Somos el reflejo de nuestro barrio, de Villa María del Triunfo. Cada vez que la pelota rueda, hay una historia de esfuerzo y dedicación detrás.", 
    idP2: "Nuestra hinchada es nuestro jugador número 12. Con más de 1,000 \"Me gusta\" y seguidores incondicionales, la tribuna siempre se pinta de azul y amarillo. Aquí se juega con la camiseta pegada al pecho.",
    champTitle: "CAMPEONES <br> LIGA VMT 2025", 
    champText: "Contra todo pronóstico, con sudor, lágrimas y el mejor fútbol. El Club Deportivo VyA se coronó campeón absoluto de la liga distrital. ¡La copa se queda en casa!",
    socioTitle: "Socio Oficial VyA", 
    socioText: "Únete a la familia VyA. Recibe beneficios exclusivos, prioridad en el estadio y descuentos en indumentaria oficial.",
    imgShield: "image_b01059.jpg", 
    imgIdent: "https://images.unsplash.com/photo-1518605368461-1eb7614f8d22?q=80&w=2000&auto=format&fit=crop"
};

export const MOCK_NEWS = [
    { id: 'mock1', title: '¡Iniciamos la pretemporada 2026!', content: 'El equipo ha comenzado los entrenamientos con la mira puesta en el bicampeonato de la liga. Nuevos refuerzos se suman al plantel para darlo todo en la cancha.', img: 'https://images.unsplash.com/photo-1518605368461-1eb7614f8d22?q=80&w=800&auto=format&fit=crop', createdAt: Date.now(), isMock: true },
    { id: 'mock2', title: 'Presentación de la nueva piel', content: 'Conoce la nueva camiseta oficial del CD VyA para esta temporada. Manteniendo nuestra gloriosa identidad azul y oro que nos representa en todo VMT.', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop', createdAt: Date.now() - 86400000, isMock: true },
    { id: 'mock3', title: 'Convocatoria de menores', content: 'Invitamos a todos los jóvenes talentos del distrito a probarse en nuestras divisiones menores este fin de semana. ¡Ven y sé parte del semillero de campeones!', img: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop', createdAt: Date.now() - 172800000, isMock: true }
];

export const MOCK_COMMENTS = [
    { id: 'mockc1', author: 'Hincha Fiel', text: '¡Vamos VyA! Este año damos la vuelta otra vez. Siempre con ustedes en la tribuna alentando hasta el final.', createdAt: Date.now() - 3600000, isMock: true, likes: 15, replies: [{author: 'Loco de la Sur', text: '¡Siempre en la tribuna hermano!'}] },
    { id: 'mockc2', author: 'Loco de la Sur', text: 'Pongan garra muchachos, el barrio entero los apoya. ¡Sangre azul y oro en las venas!', createdAt: Date.now() - 7200000, isMock: true, likes: 23, replies: [] },
    { id: 'mockc3', author: 'María VMT', text: 'Ya quiero que empiece el campeonato para ir al estadio a gritar los goles. ¡Con todo campeones!', createdAt: Date.now() - 15000000, isMock: true, likes: 8, replies: [{author: 'Hincha Fiel', text: '¡Nos vemos en el estadio!'}, {author: 'Carlos VyA', text: 'La hinchada ya está lista'}] }
];
