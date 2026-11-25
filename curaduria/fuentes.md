# Registro de fuentes

Lo leen las corridas automáticas de relevamiento. URLs verificadas el 24/11/2026: todas respondieron con un feed o una página válida. Cada corrida guarda, por fuente, la fecha del último ítem leído (marcador), así no depende de una ventana fija.

Estados posibles: `confiable` (elegida por Ari o con buena tasa de aceptación), `a prueba` (nueva) y `en pausa` (casi nada suyo entra en dos meses).

## Lista de X "Tech" (de Ari)

| Campo | Valor |
|---|---|
| Lista | "Tech", privada, de Ari |
| id | `2042208628715692293` |
| Miembros | 185 (al 24/11/2026) |
| Conector | `user-X` (la conexión de X de Ari) |
| Permisos | **Solo lectura.** Nunca publicar, seguir, dar like, ni modificar la lista ni sus miembros. |
| Estado | confiable (en las personas, no en todo lo que publican: cada post pasa por los filtros) |
| Cadencia | Diaria (ventana del digest: los últimos 14 días en la primera corrida, después desde el marcador) |

Cómo leerla:

1. `get_lists_members` (id de arriba, `max_results` 100, paginando) para tener los `username` de los miembros. Se puede cachear y refrescar una vez por semana.
2. `get_lists_posts` trae unos 100 posts por hora de actividad de la lista: sirve para lo más reciente, pero no alcanza para cubrir días.
3. Para cubrir la ventana completa: búsqueda pública `search_posts_all` del conector `x`, con lotes de unos 50 usuarios por consulta: `(from:a OR from:b …) has:links -is:retweet -is:reply`, con `start_time` en el marcador y `sort_order: relevancy`. El operador `list:` no devuelve resultados para esta lista privada.
4. Sumar una consulta por los miembros de más señal sin `has:links`, porque muchos posts largos (note posts) no linkean a nada.
5. Seguir el link del post hasta el recurso original y evaluar el recurso, no el post. Un post de X entra como ficha solo si es largo y sustantivo por sí mismo.

Límites del conector (al 24/11/2026): 30 lecturas por minuto y 1000 por día.

## Referentes elegidos por Ari

| Referente | Feed o canal verificado | Último ítem al 24/11/2026 | Estado | Cadencia | Notas |
|---|---|---|---|---|---|
| Henrik Kniberg | YouTube RSS: https://www.youtube.com/feeds/videos.xml?channel_id=UCW0cG4zyFG8oKAlOom4KonQ | 22/04/2026 | confiable | Semanal | Blog de Abundly sin RSS: https://www.abundly.ai/blog (el sitemap https://www.abundly.ai/sitemap.xml no trae fechas). El feed de Crisp (https://blog.crisp.se/author/henrikkniberg/feed) está inactivo desde 2023. Publica mucho en LinkedIn, que no leemos. |
| Marty Cagan | https://www.svpg.com/feed/ | 06/11/2026 | confiable | Semanal | |
| Roman Pichler | https://www.romanpichler.com/feed/ | 24/11/2026 | confiable | Semanal | Desde el box, curl da timeout: leer con web fetch. |
| Aaron Levie | Sin blog ni feed. X: @levie (id `914061`) | 23/11/2026 (X) | confiable | Diaria (por la lista Tech) | Ya es miembro de la lista Tech. Publica posts largos de opinión sobre agentes en la empresa: casi siempre sin datos, por eso puntúan bajo en evidencia. |
| Addy Osmani | https://addyosmani.com/rss.xml y https://addyo.substack.com/feed | 14/09/2026 (blog), 14/10/2026 (Substack) | confiable | Semanal | |
| Birgitta Böckeler | https://birgitta.info/feed.xml | 20/10/2026 | confiable | Semanal | También publica en martinfowler.com. Ese feed (https://martinfowler.com/feed.atom) atribuye todo a Martin Fowler: el autor real está en `<address class='name'>` de cada página. Leerlo completo, porque otros autores de Thoughtworks también suelen calificar. |
| Thinking Inc | Sin RSS. Sitemap: https://thinking.inc/sitemap-0.xml | Sin fecha por página (el sitemap tiene un único `lastmod`, 12/11/2026) | a prueba | Mensual | Detectar páginas nuevas comparando el sitemap con la corrida anterior; la fecha real está en el `datePublished` del JSON-LD de cada página. Contenido de consultora, orientado a SEO: verificar las estadísticas que cita antes de usarlas. Ya hay una ficha suya en el vault. |
| Jurgen Appelo | https://substack.jurgenappelo.com/feed | 14/10/2026 | confiable | Semanal | La URL `jurgenappelo.substack.com/feed` da error ("invite-only"): usar la de arriba. |
| Agility at Scale | https://agility-at-scale.com/feed/ | 22/11/2026 | a prueba | Semanal | Ari tiene que confirmar que es el sitio que quiso decir. Publica guías largas de gestión del cambio (ADKAR, Kotter, Cynefin), casi sin IA: ver la pregunta abierta en `rubrica.md`. |

## Otras fuentes ya presentes en el vault (semilla, a prueba)

Se suman al relevamiento cuando Ari lo confirme: martinfowler.com, Anthropic, HumanLayer, Abundly, Sebastian Raschka, Age of Product (Stefan Wolpers), McKinsey.

## Pendientes

- Newsletters por email: esperan a que Ari active el email de Faro. Hasta entonces, no suscribirse a nada.
