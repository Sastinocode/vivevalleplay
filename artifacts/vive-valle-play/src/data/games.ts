import { Game } from "../types";

export const games: Game[] = [
  {
    id: "juicio-casa",
    title: "El Juicio de la Casa",
    slug: "el-juicio-de-la-casa",
    description: "Un juego para conoceros mejor y establecer las reglas (o no) de la convivencia.",
    category: "Creatividad",
    durationMin: 15,
    difficulty: "fun",
    recommendedGroups: ["familia", "mixto"],
    recommendedMoments: ["llegada", "tarde"],
    minPlayers: 3,
    endingTitle: "¡Ya sois familia de la casa!",
    endingDescription: "Habéis empezado con el pie derecho. Esta casa os ha elegido.",
    steps: [
      {
        id: "intro-1",
        title: "Bienvenida a la Casa",
        description: "Dejad las maletas, servíos algo de beber. Es hora de decidir quién es quién en este viaje.",
        type: "intro"
      },
      {
        id: "vote-1",
        title: "El Chef",
        description: "¿Quién sería el mejor chef de la casa si hubiera que cocinar ahora mismo?",
        type: "vote"
      },
      {
        id: "choice-1",
        title: "La Regla de Oro",
        description: "¿Qué regla inventaríais para esta casa?",
        type: "choice",
        options: ["Nadie puede hablar de trabajo", "El último en levantarse hace el desayuno", "Prohibido el móvil durante las comidas", "Brindis obligatorio cada noche"]
      },
      {
        id: "challenge-1",
        title: "Talento Oculto",
        description: "Cada uno tiene 30 segundos para impresionar al grupo con un talento (útil o inútil). ¡A brillar!",
        type: "challenge",
        durationSeconds: 30
      },
      {
        id: "memory-1",
        title: "La Foto Oficial",
        description: "Juntaos todos. Es el momento de la foto del primer día. ¡Sonreíd!",
        type: "memory"
      },
      {
        id: "result-1",
        title: "Veredicto",
        description: "El grupo ha hablado.",
        type: "result"
      }
    ]
  },
  {
    id: "cena-imposible",
    title: "La Cena Imposible",
    slug: "la-cena-imposible",
    description: "Debates culinarios, confesiones y retos antes de sentarse a la mesa.",
    category: "Social",
    durationMin: 20,
    difficulty: "medium",
    recommendedGroups: ["amigos", "mixto"],
    recommendedMoments: ["cena", "tarde"],
    minPlayers: 3,
    endingTitle: "¡Menú de lujo servido!",
    endingDescription: "Con este grupo, cualquier cena se convierte en un evento.",
    steps: [
      {
        id: "intro-1",
        title: "Abrid el apetito",
        description: "Antes de empezar a comer, vamos a preparar el ambiente con unas cuantas confesiones culinarias.",
        type: "intro"
      },
      {
        id: "vote-1",
        title: "Desastre en la cocina",
        description: "¿Quién cocinaría peor en MasterChef?",
        type: "vote"
      },
      {
        id: "text-1",
        title: "Plato exótico",
        description: "Por turnos, decid cuál es el plato más raro o asqueroso que habéis probado nunca.",
        type: "text"
      },
      {
        id: "choice-1",
        title: "El Menú Ideal",
        description: "Si pudierais elegir ahora mismo, ¿qué tipo de cena os gustaría tener?",
        type: "choice",
        options: ["Italiana (Pizza & Pasta)", "Española (Tapas y más tapas)", "Mexicana (Tacos y Margaritas)", "Asiática (Sushi o Pad Thai)"]
      },
      {
        id: "challenge-1",
        title: "El Acento",
        description: "Tenéis 20 segundos cada uno para pedir un plato imaginario con vuestro mejor acento extranjero.",
        type: "challenge",
        durationSeconds: 20
      },
      {
        id: "vote-2",
        title: "El Ganador",
        description: "¿Quién ha hecho el mejor acento?",
        type: "vote"
      },
      {
        id: "result-1",
        title: "Bon Appétit",
        description: "Ya podéis empezar a cenar (¡y a disfrutar!).",
        type: "result"
      }
    ]
  },
  {
    id: "noche-verdades",
    title: "Noche de Verdades",
    slug: "noche-de-verdades",
    description: "Baja las luces, sube la música. Un juego de confesiones y momentos íntimos.",
    category: "Íntimo",
    durationMin: 25,
    difficulty: "easy",
    recommendedGroups: ["pareja", "amigos"],
    recommendedMoments: ["noche", "despedida"],
    minPlayers: 2,
    endingTitle: "Una noche para no olvidar",
    endingDescription: "Hay momentos que se quedan para siempre. Este es uno.",
    steps: [
      {
        id: "intro-1",
        title: "Preparad el ambiente",
        description: "Luces tenues, algo de beber y dejad los móviles a un lado. Es el momento de escuchar.",
        type: "intro"
      },
      {
        id: "vote-1",
        title: "El Misterioso",
        description: "¿Quién crees que tiene el secreto más sorprendente de este grupo?",
        type: "vote"
      },
      {
        id: "text-1",
        title: "La Confesión",
        description: "Es el momento. Que cada uno cuente algo que casi nadie del grupo sabe.",
        type: "text"
      },
      {
        id: "choice-1",
        title: "El Destino",
        description: "Para la siguiente ronda, el grupo debe elegir su camino:",
        type: "choice",
        options: ["Verdad dolorosa", "Reto atrevido"]
      },
      {
        id: "challenge-1",
        title: "El Futuro",
        description: "Haced una predicción: ¿Cómo os imagináis a este grupo dentro de 5 años? Tenéis 1 minuto.",
        type: "challenge",
        durationSeconds: 60
      },
      {
        id: "memory-1",
        title: "El Cierre",
        description: "Un abrazo grupal para sellar la noche. Haced una foto para recordarlo.",
        type: "memory"
      },
      {
        id: "result-1",
        title: "La Noche es Joven",
        description: "Habéis llegado al final... de este juego.",
        type: "result"
      }
    ]
  },
  {
    id: "circo-talentos",
    title: "El Circo de los Talentos",
    slug: "el-circo-de-los-talentos",
    description: "Improvisación, payasadas y el talento más absurdo del grupo. La risa está garantizada.",
    category: "Improvisación",
    durationMin: 20,
    difficulty: "fun",
    recommendedGroups: ["amigos", "familia", "mixto"],
    recommendedMoments: ["llegada", "tarde", "cena"],
    minPlayers: 3,
    endingTitle: "¡El circo ha terminado su gira!",
    endingDescription: "No hay troupe como esta. Os habéis ganado el aplauso del público (y el vuestro propio).",
    steps: [
      {
        id: "intro-1",
        title: "Bienvenidos al circo",
        description: "Esta noche sois artistas. No importa si tenéis talento de verdad. De hecho, mejor si no lo tenéis.",
        type: "intro"
      },
      {
        id: "challenge-1",
        title: "El Monólogo de 30 Segundos",
        description: "Por turnos, cada persona tiene 30 segundos para improvisar un monólogo de un personaje absurdo: un pulpo filósofo, un robot enamorado, un cocinero medieval...",
        type: "challenge",
        durationSeconds: 30,
        hint: "El grupo elige el personaje de cada uno antes de empezar."
      },
      {
        id: "vote-1",
        title: "El Mejor Actor",
        description: "¿Quién ha hecho el mejor monólogo? Votad a mano alzada. En caso de empate, desempate con un aplauso.",
        type: "vote"
      },
      {
        id: "choice-1",
        title: "El Reto del Grupo",
        description: "Ahora toca un reto colectivo. ¿Cuál elige el grupo?",
        type: "choice",
        options: [
          "Inventar una canción sobre el viaje (30 seg)",
          "Hacer una coreografía de 5 movimientos juntos",
          "Cada uno imita a otro del grupo durante 20 seg",
          "Contar un chiste malísimo por turnos"
        ]
      },
      {
        id: "challenge-2",
        title: "El Reto Elegido",
        description: "¡Adelante con el reto que habéis elegido! Tenéis 45 segundos. Sin excusas, sin vergüenza.",
        type: "challenge",
        durationSeconds: 45
      },
      {
        id: "vote-2",
        title: "El Premio del Público",
        description: "El grupo vota: ¿quién se ha lucido más en el reto colectivo?",
        type: "vote"
      },
      {
        id: "memory-1",
        title: "La Foto del Elenco",
        description: "Todo circo necesita su cartel. Haced la foto más dramática y absurda posible. Esta es para enmarcar.",
        type: "memory"
      },
      {
        id: "result-1",
        title: "¡Que siga la función!",
        description: "El público os reclama para el bis.",
        type: "result"
      }
    ]
  },
  {
    id: "ultimo-brindis",
    title: "El Último Brindis",
    slug: "el-ultimo-brindis",
    description: "Para cerrar el viaje como merece: con gratitud, recuerdos y las palabras que quedan.",
    category: "Emoción",
    durationMin: 25,
    difficulty: "easy",
    recommendedGroups: ["familia", "amigos", "pareja", "mixto"],
    recommendedMoments: ["noche", "despedida"],
    minPlayers: 2,
    endingTitle: "Este viaje ya es vuestro para siempre",
    endingDescription: "Los momentos pasan. Los recuerdos buenos, no. Hasta la próxima.",
    steps: [
      {
        id: "intro-1",
        title: "El cierre que merece este viaje",
        description: "Buscad un sitio cómodo. Cada uno con su copa o su taza. Este juego no tiene prisa: vamos a cerrar bien.",
        type: "intro"
      },
      {
        id: "text-1",
        title: "El momento que te llevas",
        description: "Que cada uno piense y comparta: ¿cuál es el momento concreto de este viaje que más te llevas? No el sitio — el instante.",
        type: "text"
      },
      {
        id: "vote-1",
        title: "El Momento del Grupo",
        description: "Después de compartir todos vuestros momentos, votad: ¿cuál ha sido el momento compartido más memorable del viaje?",
        type: "vote"
      },
      {
        id: "choice-1",
        title: "El Tono del Brindis Final",
        description: "El brindis final puede ser de muchas formas. ¿Cuál sentís que es el vuestro hoy?",
        type: "choice",
        options: [
          "Emotivo — por lo que hemos vivido juntos",
          "Gracioso — por los momentos más ridículos",
          "Esperanzador — por lo que viene",
          "Silencioso — solo con la mirada"
        ]
      },
      {
        id: "challenge-1",
        title: "La Predicción del Viaje",
        description: "Cada persona tiene un minuto para decir una frase: 'Lo que me llevo de este viaje es...' Sin pensar demasiado. Lo primero que salga.",
        type: "challenge",
        durationSeconds: 60,
        hint: "Que cada uno hable mientras el grupo escucha en silencio."
      },
      {
        id: "text-2",
        title: "La Dedicatoria",
        description: "Por turnos, que cada uno dedique una frase a alguien del grupo. Puede ser seria, divertida, o simplemente honesta.",
        type: "text"
      },
      {
        id: "memory-1",
        title: "La Foto del Cierre",
        description: "Juntos, en el sitio donde estéis ahora mismo. No hace falta posado. Esta foto es el punto final del viaje.",
        type: "memory"
      },
      {
        id: "result-1",
        title: "Hasta la próxima",
        description: "El brindis está servido.",
        type: "result"
      }
    ]
  }
];
