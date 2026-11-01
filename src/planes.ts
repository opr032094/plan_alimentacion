/**
 * Planes de alimentación por persona y por mes. Cada plan de la nutrióloga
 * vive en `planes` bajo su clave 'persona-AAAA-MM'; para agregar otro basta
 * con sumar una entrada (persona, etiqueta, meta, guía, platillos y compras)
 * y aparece solo en los selectores y en la lista de compra.
 *
 * Solo datos y tipos: nada de React aquí.
 */

export interface Platillo {
  name: string;
  kcal: number;
  p: number; // proteína (g)
  c: number; // carbohidratos (g)
  g: number; // grasas (g)
  detail: string;
  preparacion?: string; // pasos del PDF, solo en los platillos que lo traen
}

export type Tiempo = 'desayunos' | 'comidas' | 'cenas' | 'colaciones';

export type Persona = 'Oscar' | 'Fernanda';

// Orden en que aparecen en el selector.
export const personas: Persona[] = ['Oscar', 'Fernanda'];

export interface Plan {
  persona: Persona;
  etiqueta: string;      // "Septiembre 2026"
  subtitulo: string;     // la línea bajo el título: meta diaria
  meta: string;          // resumen de la meta calórica por tiempo
  guia: string;          // el tip de "cómo usar esta tabla"
  meals: Record<Tiempo, Platillo[]>;
  extras?: { titulo: string; texto: string }[]; // listas sueltas del PDF (equivalencias, bebidas…)
  compras: SeccionCompra[]; // qué se compra para cocinar este plan, por pasillo
}

/**
 * Lista de compra del plan, por pasillo del súper. Sin cantidades: el plan no
 * dice cuántas veces a la semana se hace cada platillo, así que la lista es
 * de INSUMOS. Al elegir dos planes, un insumo con el mismo nombre se une.
 */
export interface SeccionCompra {
  titulo: string;
  items: string[];
}

export const planes: Record<string, Plan> = {
  'oscar-2026-09': {
    persona: 'Oscar',
    etiqueta: 'Septiembre 2026',
    subtitulo: 'Meta: 1,700–1,800 kcal/día en déficit',
    meta: '🎯 Desayuno ~420 kcal · Colación ~200 kcal · Comida ~430 kcal · Cena ~370 kcal = ~1,420 kcal base. Agrega colación post-entreno en días de gym.',
    guia: 'Elige un platillo de cada tiempo de comida y suma las calorías. Si el total está entre 1,600–1,800 kcal estás en déficit. Los días de gym suma la colación post-entreno.',
    meals: {
      desayunos: [
        { name: 'Huevo a la mexicana + 2 tortillas', kcal: 420, p: 28, c: 30, g: 12, detail: '2 huevos + ½ taza clara + tomate + cebolla + chile + aceite spray + 2 tortillas' },
        { name: 'Omelette de champiñones + 2 tortillas', kcal: 400, p: 27, c: 28, g: 11, detail: '2 huevos + ½ taza clara + 1 taza champiñones + cebolla + aceite spray + 2 tortillas' },
        { name: 'Rajas con queso + 2 tortillas', kcal: 450, p: 30, c: 26, g: 18, detail: '160g queso panela + chile poblano + cebolla + aceite spray + 2 tortillas' },
        { name: 'Queso guisado + 2 tortillas', kcal: 440, p: 29, c: 27, g: 17, detail: '160g queso panela + tomate + cebolla + pimiento + aceite + 2 tortillas' },
        { name: 'Huevo con papa + 2 tortillas', kcal: 430, p: 24, c: 38, g: 12, detail: '2 huevos + ½ taza clara + ½ papa + cebolla + tomate + aceite + 2 tortillas' },
        { name: 'Pan tostado con huevo y aguacate', kcal: 420, p: 24, c: 32, g: 16, detail: '2 huevos + ½ taza clara + 2 panes integrales + ⅓ aguacate + tomate + aceite spray', preparacion: 'Machaca el aguacate y úntalo en el pan tostado. Encima acomoda el tomate rebanado y el huevo revuelto (2 huevos + ½ tza de claras con aceite en spray).' },
      ],
      comidas: [
        { name: 'Tostadas de atún con chipotle', kcal: 480, p: 38, c: 38, g: 16, detail: '2 bolsas atún + 4 tostadas + ½ aguacate + pimiento + cebolla + yogurt griego + chipotle', preparacion: 'En un sartén con ½ cdita de aceite guisa el atún con el pimiento picado y la cebolla morada rebanada; condimenta al gusto. Aderezo: licúa 1–2 chipotles con 5 cdas de yogur griego sin azúcar (o crema reducida), sal y pimienta. Sirve sobre 4 tostadas horneadas con 3 tzas de lechuga y ½ aguacate.' },
        { name: 'Carne con papas en salsa verde + 2 tortillas', kcal: 420, p: 30, c: 42, g: 10, detail: '120g bistec + 1 papa + 2 zanahorias + tomatillos + aceite + 2 tortillas', preparacion: 'Hierve 6–8 tomatillos con 1–2 serranos (opcional); licúa con ¼ de cebolla y 1 diente de ajo. Con 1 cdita de aceite dora los 120 g de bistec picado, la papa y las 2 zanahorias; sala. Agrega la salsa y 1 tza de agua (más si la quieres caldosa). Cocina tapado a fuego medio-bajo hasta que la carne esté suave. Acompaña con 2 tortillas.' },
        { name: 'Espagueti verde con pollo + galletas', kcal: 430, p: 32, c: 40, g: 12, detail: '120g pollo + ½ taza pasta + zanahoria + pimiento + crema reducida + chile poblano + 2 paq galletas', preparacion: 'Condimenta 120 g de fajitas de pollo con sal, ajo y pimienta y cocínalas. Para la salsa: dora en un chorrito de aceite 1 diente de ajo, ¼ de cebolla fileteada y 2 poblanos en rajas; licúa con ½ tza de crema reducida, cilantro y 1 puñito de espinaca; condimenta. Mezcla con ½ tza de pasta cocida, 2 zanahorias al vapor y pimiento picado. Acompaña con 2 paquetitos de galletas de maíz horneadas.' },
        { name: 'Taquitos de picadillo + 3 tortillas', kcal: 470, p: 28, c: 42, g: 16, detail: 'Carne molida + frijoles + 3 tortillas + lechuga + pico de gallo + ½ aguacate' },
        { name: 'Tortitas de atún + ensalada', kcal: 400, p: 34, c: 32, g: 12, detail: '1 lata atún + huevo + zanahoria + harina avena + lechuga + espinaca + elote + 2 paq galletas', preparacion: 'Mezcla 1 lata de atún en agua, 1 huevo, 1 zanahoria rallada y 2 cdas de harina integral o de avena; sazona con sal, pimienta y ajo. Forma las tortitas y cocínalas en sartén antiadherente a fuego medio, 3–4 min por lado, hasta dorar. Sirve con 2 puñitos de lechuga, 1 tza de espinaca picada, ½ tza de elote, zanahoria rallada y 2 paquetitos de galletas de maíz.' },
        { name: 'Tostadas de pollo gobernador', kcal: 450, p: 36, c: 34, g: 14, detail: '120g pechuga + 4 tostadas + chile poblano + cebolla + tomate + 2 tzas lechuga', preparacion: 'Sofríe en 1 cdita de aceite de oliva el ajo picado, ½ tza de cebolla rebanada y 1 poblano picado 2–3 min; añade 2 tomates rebanados y cocina 2 min más. Mezcla con 120 g de pechuga desmenuzada y condimenta con sal, ajo, pimienta y chipotle al gusto. Sirve sobre 4 tostadas horneadas con 2 tzas de lechuga.' },
        { name: 'Fajitas de res a la mexicana + arroz', kcal: 440, p: 32, c: 38, g: 14, detail: '150g fajitas res + ¼ taza arroz + cebolla + chile poblano + tomate + aceite aguacate + 2 galletas' },
        { name: 'Ensalada buffalo de pollo', kcal: 380, p: 34, c: 24, g: 14, detail: '150g pollo + 2 tzas lechuga + espinaca + elote + zanahoria + salsa buffalo + 3 paq galletas' },
        { name: 'Milanesa de res a la plancha + verduras', kcal: 380, p: 36, c: 10, g: 14, detail: '150g milanesa + 1 taza brócoli + 1 taza coliflor al vapor' },
      ],
      cenas: [
        { name: 'Pan pita relleno de queso', kcal: 380, p: 28, c: 30, g: 14, detail: '1 pan pita integral + 2 reb queso panela + 2 reb pechuga pavo + pimiento + cebolla + aceite oliva' },
        { name: 'Calabacitas con queso + tortillas + frijoles', kcal: 370, p: 24, c: 32, g: 14, detail: '120g queso panela + ½ calabacita + cebolla + tomate + 2 tortillas + ½ taza frijoles + ⅓ aguacate' },
        { name: 'Miguitas con huevo + frijoles', kcal: 360, p: 22, c: 34, g: 12, detail: '2 huevos + ¼ taza clara + 2-3 tortillas cortadas + cebolla + tomate + ½ taza frijoles + aceite' },
        { name: 'Burito de huevo integral', kcal: 350, p: 22, c: 28, g: 14, detail: '2 huevos + ¼ taza clara + tortilla harina integral + espinaca + tomate + queso oaxaca', preparacion: 'Engrasa el sartén con 1 cdita de aceite y vierte el huevo batido (2 huevos + ¼ tza de claras). Coloca la tortilla de harina integral encima antes de voltear. Da la vuelta, cocina unos segundos y retira. Rellena con espinaca picada, tomate rebanado y queso asadero u oaxaca. Enrolla como wrap o dobla a la mitad.' },
        { name: 'Taquitos de bistec + ensalada nopales', kcal: 400, p: 30, c: 30, g: 14, detail: '120g bistec + 3 tortillas + ½ taza nopal + cebolla + tomate + ½ aguacate' },
        { name: 'Huevito con jamón + tortillas + frijoles', kcal: 340, p: 26, c: 30, g: 10, detail: '2 huevos + ¼ taza clara + 1 reb pechuga pavo + cebolla + tomate + 2 tortillas + ½ taza frijoles' },
        { name: 'Queso guisado + tortillas + aguacate', kcal: 380, p: 24, c: 28, g: 16, detail: '80g queso panela + cebolla + tomate + 2 tortillas + ⅓ aguacate + aceite' },
      ],
      colaciones: [
        { name: 'Pan tostado + mermelada + nuez/almendra', kcal: 220, p: 5, c: 28, g: 10, detail: '1 pan tostado integral + mermelada + 7 mitades nuez o 10 almendras' },
        { name: 'Manzana + galleta Stila + nuez', kcal: 200, p: 4, c: 26, g: 9, detail: '1 manzana + barrita Stila Quaker + 7 mitades nuez o 10 almendras' },
        { name: 'Tortitas de arroz + crema cacahuate + plátano', kcal: 280, p: 7, c: 36, g: 12, detail: '2 tortitas arroz + 2 cdas crema cacahuate + 1 plátano rebanado' },
        { name: 'Licuado de plátano con avena', kcal: 290, p: 6, c: 40, g: 10, detail: '1 taza leche vegetal + 1 plátano + 3 cdas avena + 7 mitades nuez' },
        { name: 'Fruta + nuez/almendra', kcal: 160, p: 3, c: 22, g: 8, detail: '1 porción fruta (manzana, mandarina, naranja, melón) + 7 mitades nuez o 10 almendras' },
        { name: 'Bites energéticos (2 bolitas 30g c/u)', kcal: 180, p: 5, c: 24, g: 8, detail: 'Plátano + avena + 2 cditas miel + crema cacahuate reducida — versión Oscar', preparacion: 'Haz puré 1 plátano maduro y mézclalo con 1 tza de avena, 2 cdas de miel, ¼ tza de crema de cacahuate, sal, vainilla y canela al gusto (opcional: chocolate sin azúcar picado). Forma bolitas y refrigera o congela 30 min. Sirven de snack o pre-entreno.' },
        { name: 'Barrita K-Gear', kcal: 153, p: 21, c: 19, g: 3, detail: '21g proteína, 0g azúcar añadida — aprobada como post-entreno' },
        { name: 'Yogur griego Yoplait + fruta', kcal: 200, p: 18, c: 20, g: 3, detail: '200g yogur griego natural + 1 porción fruta' },
      ],
    },
    compras: [
      { titulo: 'Proteínas y lácteos', items: [
        'Huevo', 'Claras de huevo', 'Queso panela', 'Queso oaxaca o asadero', 'Pechuga de pavo (rebanadas)',
        'Pechuga de pollo', 'Fajitas de pollo', 'Bistec de res', 'Fajitas de res', 'Milanesa de res', 'Carne molida',
        'Atún en agua (lata o bolsa)', 'Yogur griego sin azúcar', 'Crema reducida en grasa', 'Leche vegetal',
      ] },
      { titulo: 'Frutas y verduras', items: [
        'Tomate', 'Tomatillo', 'Cebolla', 'Cebolla morada', 'Ajo', 'Chile poblano', 'Chile serrano', 'Pimiento',
        'Champiñones', 'Papa', 'Zanahoria', 'Calabacita', 'Nopal', 'Brócoli', 'Coliflor', 'Espinaca', 'Lechuga',
        'Cilantro', 'Aguacate', 'Limón', 'Plátano', 'Manzana', 'Fruta de temporada (mandarina, naranja, melón)',
      ] },
      { titulo: 'Cereales y tortillas', items: [
        'Tortillas de maíz', 'Tortilla de harina integral', 'Pan integral', 'Pan pita integral',
        'Tostadas de maíz horneadas', 'Galletas de maíz horneadas (paquetitos)', 'Espagueti', 'Arroz', 'Avena',
        'Harina de avena o integral', 'Tortitas de arroz', 'Barrita Stila Quaker', 'Barrita K-Gear',
      ] },
      { titulo: 'Despensa', items: [
        'Aceite en spray', 'Aceite de oliva o canola', 'Frijoles', 'Elote en lata', 'Chile chipotle', 'Salsa buffalo',
        'Mermelada de fruta', 'Crema de cacahuate', 'Miel', 'Nuez o almendra', 'Chía', 'Sal, pimienta y orégano',
      ] },
    ],
  },
  'fernanda-2026-09': {
    persona: 'Fernanda',
    etiqueta: 'Septiembre 2026',
    subtitulo: 'Nutrióloga Danae Montes · kcal estimadas, el PDF no las trae',
    meta: '🎯 Desayuno ~370 kcal · Comida ~370 kcal · Cena ~360 kcal · Snack ~190 kcal = ~1,300 kcal/día (estimado). El snack va 1 vez al día, a cualquier hora.',
    guia: 'Elige un platillo de cada tiempo de comida. Las proteínas (carne, pollo, pescado, atún) se pesan en CRUDO; si pesas ya cocido, resta 30 g a la porción. Usa tazas medidoras hasta que domines las porciones. Las calorías son estimadas a partir de las porciones del PDF.',
    meals: {
      desayunos: [
        { name: 'Migas con huevo', kcal: 340, p: 22, c: 26, g: 15, detail: '2 huevos + ¼ tza claras + 3 tortillas de maíz delgaditas + tomate picadito + 1 cdita aceite de oliva' },
        { name: 'Huevito con espinacas y pavo', kcal: 370, p: 27, c: 25, g: 15, detail: '2 huevos + ¼ tza claras + espinacas + 1 reb pechuga de pavo + 1 cdita aceite de oliva + 3 tortillas de maíz delgaditas' },
        { name: 'Queso en salsa de tomate + salmas', kcal: 380, p: 22, c: 19, g: 25, detail: '100 g queso panela en salsa de tomate con chile morrón rojo + 1 cdita aceite de oliva + 1 paq salmas' },
        { name: 'Smoothie de proteína con fresa', kcal: 350, p: 30, c: 22, g: 16, detail: '1 tza leche de almendras + 1 scoop proteína (Habits o HEB) + 1 tza fresas congeladas + 1 cda crema de almendras + 1 cda linaza en polvo + hielo' },
        { name: 'Sandwich de pavo y panela', kcal: 380, p: 27, c: 28, g: 16, detail: '2 reb pan integral Sara Lee tostado + mostaza dijon + 3 reb jamón de pavo + 40 g panela light + ½ aguacate + arúgula + espinaca + tomate' },
      ],
      comidas: [
        { name: 'Fajitas de pollo con champiñones y morrón + quinoa', kcal: 330, p: 38, c: 22, g: 10, detail: '150 g fajita de pollo + rajas de pimiento morrón + champiñones + 1 cdita aceite de oliva + ⅓ tza quinoa cocida con vegetales' },
        { name: 'Milanesa con vegetales + arroz integral', kcal: 390, p: 37, c: 26, g: 14, detail: '150 g milanesa de res + ejotes + germen de soya + zanahoria + 1 cdita aceite de oliva + ⅓ tza arroz integral con vegetales' },
        { name: 'Bowl de pollo mediterráneo', kcal: 390, p: 40, c: 26, g: 14, detail: '150 g pollo en cubos + 2 cdas salsa de soya baja en sodio + 1 cdita ajonjolí + 1 cdita aceite de oliva + ⅓ tza quinoa + zanahoria + tomate cherry + lechuga y espinaca + 6 almendras' },
        { name: 'Tostadas de picadillo poblano', kcal: 390, p: 36, c: 32, g: 11, detail: '150 g carne molida 97/3 + chile poblano + elote + cebolla morada + 1 cdita aceite de oliva + 3 tostadas Tortiregias + ensalada verde' },
        { name: 'Pollo con calabacita + quinoa', kcal: 360, p: 38, c: 30, g: 10, detail: '150 g pollo en cubos + calabacita + elote en salsa de tomate casera + 1 cdita aceite de oliva + ⅓ tza quinoa cocida con vegetales' },
      ],
      cenas: [
        { name: 'Queso con acelgas + frijoles', kcal: 370, p: 31, c: 21, g: 17, detail: '120 g queso panela light en salsa de tomate con acelgas + 1 cdita aceite de oliva + ⅓ tza frijoles de la olla' },
        { name: 'Tostadas de pollo', kcal: 350, p: 29, c: 26, g: 12, detail: '3 tostadas Tortiregias + 100 g pechuga de pollo + lechuga orejona + tomate + espinaca + panela light rallado + guacamole (⅓ aguacate con pico de gallo)' },
        { name: 'Omelette de pavo', kcal: 340, p: 32, c: 10, g: 19, detail: '2 huevos + ¼ tza claras + 2 reb pechuga de pavo con tomate + 1 cda mozzarella + 1 cdita aceite de oliva + tomate cherry asado con orégano, albahaca y champiñones' },
        { name: 'Huevo revuelto con vegetales + tortillas', kcal: 360, p: 24, c: 28, g: 15, detail: '2 huevos + ¼ tza claras + morrón rojo + champiñones + 1 cdita aceite + 3 tortillas de maíz delgaditas' },
        { name: 'Tostaditas de tinga de atún', kcal: 370, p: 26, c: 30, g: 14, detail: '1 lata atún en salsa de tomate con chipotle + 1 cdita aceite de oliva + 3 tostadas Tortiregias + ⅓ aguacate como guacamole + ensalada de nopalitos con pico de gallo y limón' },
      ],
      colaciones: [
        { name: 'Yogur griego + fruta + nueces', kcal: 190, p: 14, c: 20, g: 7, detail: '½ tza yogur skyr Yoplait o Chobani (el azul, alto en proteína) + 1 porción de fruta del listado + 9 mitades de nuez — 1 vez al día, a cualquier hora' },
      ],
    },
    extras: [
      { titulo: 'Fruta (1 porción)', texto: '1 manzana · 1 tza papaya · 1 tza melón · 2 naranjas · 3 guayabas · 1 tza sandía · ½ plátano · 3 ciruelas · ½ mango · 18 uvas · 1 reb piña · 2 mandarinas · 1 kiwi · 1 toronja · 1 tza fresas · 1 tza moras · 1 tza frambuesas. Varía durante la semana.' },
      { titulo: 'Vegetales (equivalencias)', texto: 'Acelgas crudas 2 tzas · espinacas crudas 2 tzas · lechuga 3 tzas · arúgula 1 tza · pimiento 1 pza · zanahoria cruda ½ tza · champiñón crudo 1 tza · tomate saladet 1 pza · tomate cherry ½ tza · nopalitos a la plancha 1 tza · calabacita 1 pza · brócoli cocido ½ tza · coliflor cocida 1 tza · chile poblano ½ pza · ejotes ½ tza. Se pueden combinar en una sola comida.' },
      { titulo: 'Ensaladas', texto: 'Si prefieres ensalada en la comida, lleva mínimo 5 de: lechuga orejona, espinaca, arúgula, acelgas, kale, tomate, apio, cebolla morada, zanahoria, col de Bruselas, nopal, pepino, pimiento morrón, almendras, nueces, pistaches.' },
      { titulo: 'Bebidas permitidas', texto: 'Agua natural, infusiones de té, jamaica natural, limonada natural, agua gasificada, café. Si endulzas, usa sustituto. Golden milk: 1 cucharada de la mezcla (cúrcuma, jengibre, pimienta negra y canela) en 1 tza de leche vegetal, de preferencia caliente por la noche.' },
    ],
    compras: [
      { titulo: 'Proteínas y lácteos', items: [
        'Huevo', 'Claras de huevo', 'Queso panela light', 'Queso mozzarella', 'Jamón de pechuga de pavo',
        'Pechuga de pollo', 'Fajitas de pollo', 'Milanesa de res', 'Carne molida 97/3', 'Atún en agua (lata o bolsa)',
        'Yogur griego skyr (Yoplait) o Chobani', 'Leche de almendras', 'Proteína en polvo (Habits o HEB)', 'Leche vegetal',
      ] },
      { titulo: 'Frutas y verduras', items: [
        'Tomate', 'Tomate cherry', 'Cebolla', 'Cebolla morada', 'Ajo', 'Chile poblano', 'Pimiento', 'Champiñones',
        'Zanahoria', 'Calabacita', 'Ejotes', 'Germen de soya', 'Nopal', 'Espinaca', 'Arúgula', 'Acelgas',
        'Lechuga orejona', 'Aguacate', 'Limón', 'Fresas congeladas', 'Fruta del listado (manzana, papaya, melón…)',
        'Orégano y albahaca frescos',
      ] },
      { titulo: 'Cereales y tortillas', items: [
        'Tortillas de maíz delgaditas', 'Tostadas Tortiregias', 'Pan integral Sara Lee', 'Salmas', 'Quinoa', 'Arroz integral',
      ] },
      { titulo: 'Despensa', items: [
        'Aceite de oliva', 'Frijoles', 'Elote en lata', 'Chile chipotle', 'Salsa de soya baja en sodio', 'Mostaza dijon',
        'Crema de almendras', 'Linaza en polvo', 'Nuez o almendra', 'Ajonjolí', 'Mezcla de golden milk',
        'Té, jamaica y limón para aguas', 'Sal, pimienta y orégano',
      ] },
    ],
  },
  'fernanda-2026-10': {
    persona: 'Fernanda',
    etiqueta: 'Octubre 2026',
    subtitulo: 'Nutrióloga Danae Montes · kcal estimadas, el PDF no las trae',
    meta: '🎯 Desayuno ~380 kcal · Comida ~290 kcal · Cena ~350 kcal · Snack ~160 kcal = ~1,180 kcal/día (estimado). El snack va 1 vez al día, a cualquier hora.',
    guia: 'Elige un platillo de cada tiempo de comida. Las proteínas (carne, pollo, pescado, atún) se pesan en CRUDO; si pesas ya cocido, resta 30 g a la porción. Usa tazas medidoras hasta que domines las porciones. Las calorías son estimadas a partir de las porciones del PDF.',
    meals: {
      desayunos: [
        { name: 'Huevo a la mexicana', kcal: 300, p: 23, c: 13, g: 16, detail: '2 huevos + ¼ tza claras guisado con pico de gallo + 1 reb pechuga de pavo en cuadritos + 1 paq salmas + 1 cdita aceite de oliva' },
        { name: 'Green sandwich thins', kcal: 375, p: 25, c: 24, g: 19, detail: 'Pan thins tostado con mostaza dijon + 90 g queso panela light + espinacas + tomate en rodajas + arúgula + ½ aguacate' },
        { name: 'Chilaquiles ligeros', kcal: 430, p: 22, c: 32, g: 24, detail: '40 g totopos Tortiregias + 2 huevos revueltos o estrellados + un poco de panela rallada + 1 cdita aceite de oliva + salsa roja o verde casera + ⅓ aguacate + cilantro y cebolla morada' },
        { name: 'Smoothie de proteína cereza negra', kcal: 370, p: 27, c: 28, g: 15, detail: '1 tza leche de almendras + 1 sobre proteína (Habits o HEB) + 1 tza cerezas negras congeladas + 1 cda crema de almendras + 1 cda linaza en polvo y cacao en polvo + hielo' },
        { name: 'Overnight oats de fresa', kcal: 435, p: 32, c: 38, g: 16, detail: '1 tza leche de almendras + 20 g avena + 1 scoop proteína + 2 cdas chía + ⅓ tza yogur griego Yoplait (blanco con verde); reposar una noche. Al día siguiente: fresa picadita + 6 mitades de nuez o 1 cda crema de almendras' },
      ],
      comidas: [
        { name: 'Filete de pescado a las finas hierbas', kcal: 290, p: 32, c: 30, g: 3, detail: '150 g filete de pescado con finas hierbas, jugo de limón y cilantro a la plancha + zanahoria, calabacita y pimiento morrón al vapor + ½ tza lentejas cocidas' },
        { name: 'Molida con vegetales verdes', kcal: 295, p: 33, c: 17, g: 10, detail: '150 g carne molida 97/3 guisada con brócoli, espinacas y ejotes picaditos + 1 cdita aceite de oliva + ¼ tza arroz integral cocido con vegetales picaditos' },
        { name: 'Pescado al cajún', kcal: 250, p: 31, c: 15, g: 6, detail: '150 g filete de pescado o pollo marinado con la mezcla de especias + 1 cdita aceite de oliva + espárragos a la plancha con un poco de salsa de soya + 60 g papa en cuadros con ajo en polvo y paprika (plancha, airfryer o puré)', preparacion: 'Mezcla sal, ajo, cebolla, paprika, pimienta de cayena, orégano, tomillo y pimienta negra hasta integrar bien (las cantidades son a tu gusto, aprox. 1 cdita de cada una). Coloca el filete de pescado y cúbrelo muy bien de ambos lados con las especias; posiblemente no uses todo. Llévalo a cocinar a la plancha o al horno.' },
        { name: 'Pollo estilo oriental', kcal: 325, p: 38, c: 28, g: 8, detail: '150 g fajita de pollo sazonada, guisada con germen de soya + calabacita + zanahoria + pimiento morrón + ⅓ tza pasta integral cocida mezclada con el pollo + 1 cdita aceite de oliva' },
        { name: 'Bowl mix de vegetales con pollo', kcal: 275, p: 17, c: 12, g: 18, detail: '50 g pechuga de pollo en cubitos con pimienta limón a la plancha (así viene en el PDF; las otras comidas llevan 150 g) + 1 cdita aceite de oliva + cama de arúgula, espinacas, tomate cherry y pepino + 2 cdas queso mozzarella + ⅓ aguacate + aderezo La Ligera' },
      ],
      cenas: [
        { name: 'Pechuga de pavo en salsa', kcal: 285, p: 18, c: 36, g: 9, detail: '4 reb pechuga de pavo guisada con tomate picado + espinaca picadita + 1 cdita aceite de oliva + ensalada de nopalitos con pico de gallo + 3 tortillas de maíz delgaditas' },
        { name: 'Tostadas de quesito poblano', kcal: 370, p: 24, c: 34, g: 14, detail: '100 g queso panela light guisado con rajas de chile poblano + elote + 1 cdita aceite de oliva + 3 tostadas Tortiregias' },
        { name: 'Ensalada de atún', kcal: 365, p: 26, c: 34, g: 14, detail: '1 lata atún + ⅓ tza pasta de tornillo integral cocida + 1 cda mayonesa light + espinaca y cebolla morada picaditas + ⅓ aguacate + 1 paq salmas + chiles en vinagre' },
        { name: 'Ensalada de carnes frías', kcal: 400, p: 25, c: 26, g: 22, detail: '1 huevo duro + 3 reb pechuga de pavo en cuadritos + 40 g queso panela light en cubitos + lechuga orejona + espinaca + zanahoria y betabel rallados + elote + ⅓ aguacate + 1 paq salmas troceadas + aderezo La Ligera' },
        { name: 'Tacos dorados de atún', kcal: 320, p: 28, c: 31, g: 9, detail: '1 lata atún guisado con cebolla morada + pimiento morrón rojo, sal, pimienta, paprika, un chorrito de salsa de soya baja en sodio y limón + 3 tortillas de maíz delgaditas + un poco de mozzarella; dorar en el comal y servir con ensalada' },
      ],
      colaciones: [
        { name: 'Fruta + barrita Stila o brownie Fiber One', kcal: 160, p: 3, c: 30, g: 4, detail: '1 porción de fruta del listado + 1 barrita Stila Quaker o 1 brownie Fiber One — 1 vez al día, a cualquier hora' },
      ],
    },
    extras: [
      { titulo: 'Fruta (1 porción)', texto: '1 manzana · 1 tza papaya · 1 tza melón · 2 naranjas · 3 guayabas · 1 tza sandía · ½ plátano · 3 ciruelas · ½ mango · 18 uvas · 1 reb piña · 2 mandarinas · 1 kiwi · 1 toronja · 1 tza fresas · 1 tza moras · 1 tza frambuesas. Varía durante la semana.' },
      { titulo: 'Vegetales (equivalencias)', texto: 'Acelgas crudas 2 tzas · espinacas crudas 2 tzas · lechuga 3 tzas · arúgula 1 tza · pimiento 1 pza · zanahoria cruda ½ tza · champiñón crudo 1 tza · tomate saladet 1 pza · tomate cherry ½ tza · nopalitos a la plancha 1 tza · calabacita 1 pza · brócoli cocido ½ tza · coliflor cocida 1 tza · chile poblano ½ pza · ejotes ½ tza. Se pueden combinar en una sola comida.' },
      { titulo: 'Ensaladas', texto: 'Si prefieres ensalada en la comida, lleva mínimo 5 de: lechuga orejona, espinaca, arúgula, acelgas, kale, tomate, apio, cebolla morada, zanahoria, col de Bruselas, nopal, pepino, pimiento morrón, almendras, nueces, pistaches.' },
      { titulo: 'Bebidas permitidas', texto: 'Agua natural, infusiones de té, jamaica natural, limonada natural, agua gasificada, café. Si endulzas, usa sustituto. Golden milk: 1 cucharada de la mezcla (cúrcuma, jengibre, pimienta negra y canela) en 1 tza de leche vegetal, de preferencia caliente por la noche.' },
    ],
    compras: [
      { titulo: 'Proteínas y lácteos', items: [
        'Huevo', 'Claras de huevo', 'Queso panela light', 'Queso mozzarella', 'Jamón de pechuga de pavo',
        'Pechuga de pollo', 'Fajitas de pollo', 'Carne molida 97/3', 'Filete de pescado', 'Atún en agua (lata o bolsa)',
        'Yogur griego Yoplait (blanco con verde)', 'Leche de almendras', 'Proteína en polvo (Habits o HEB)',
      ] },
      { titulo: 'Frutas y verduras', items: [
        'Tomate', 'Tomate cherry', 'Cebolla', 'Cebolla morada', 'Ajo', 'Chile poblano', 'Pimiento', 'Zanahoria',
        'Calabacita', 'Brócoli', 'Ejotes', 'Germen de soya', 'Nopal', 'Espinaca', 'Arúgula', 'Lechuga orejona',
        'Pepino', 'Betabel', 'Espárragos', 'Papa', 'Aguacate', 'Limón', 'Cilantro', 'Fresas', 'Cerezas negras congeladas',
        'Fruta del listado (manzana, papaya, melón…)',
      ] },
      { titulo: 'Cereales y tortillas', items: [
        'Tortillas de maíz delgaditas', 'Tostadas Tortiregias', 'Pan thins', 'Salmas', 'Arroz integral',
        'Pasta integral', 'Avena', 'Lentejas', 'Barrita Stila Quaker', 'Brownie Fiber One',
      ] },
      { titulo: 'Despensa', items: [
        'Aceite de oliva', 'Elote en lata', 'Chile chipotle', 'Salsa de soya baja en sodio', 'Mostaza dijon',
        'Mayonesa light', 'Aderezo La Ligera', 'Chiles en vinagre', 'Crema de almendras', 'Linaza en polvo', 'Chía',
        'Cacao en polvo', 'Nuez', 'Hierbas finas', 'Paprika', 'Pimienta de cayena', 'Tomillo', 'Mezcla de golden milk',
        'Té, jamaica y limón para aguas', 'Sal, pimienta y orégano',
      ] },
    ],
  },
};

// Los planes de una persona, del más reciente al más viejo, para que el
// selector abra en el vigente.
export function clavesDe(persona: Persona): string[] {
  return Object.keys(planes).filter((k) => planes[k].persona === persona).sort().reverse();
}
