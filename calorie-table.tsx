
import { useState } from "react";

const meals = {
  desayunos: [
    { name: "Huevo a la mexicana + 2 tortillas", kcal: 420, p: 28, c: 30, g: 12, detail: "2 huevos + ½ taza clara + tomate + cebolla + chile + aceite spray + 2 tortillas" },
    { name: "Omelette de champiñones + 2 tortillas", kcal: 400, p: 27, c: 28, g: 11, detail: "2 huevos + ½ taza clara + 1 taza champiñones + cebolla + aceite spray + 2 tortillas" },
    { name: "Rajas con queso + 2 tortillas", kcal: 450, p: 30, c: 26, g: 18, detail: "160g queso panela + chile poblano + cebolla + aceite spray + 2 tortillas" },
    { name: "Queso guisado + 2 tortillas", kcal: 440, p: 29, c: 27, g: 17, detail: "160g queso panela + tomate + cebolla + pimiento + aceite + 2 tortillas" },
    { name: "Huevo con papa + 2 tortillas", kcal: 430, p: 24, c: 38, g: 12, detail: "2 huevos + ½ taza clara + ½ papa + cebolla + tomate + aceite + 2 tortillas" },
    { name: "Pan tostado con huevo y aguacate", kcal: 420, p: 24, c: 32, g: 16, detail: "2 huevos + ½ taza clara + 2 panes integrales + ⅓ aguacate + tomate + aceite spray" },
  ],
  comidas: [
    { name: "Tostadas de atún con chipotle", kcal: 480, p: 38, c: 38, g: 16, detail: "2 bolsas atún + 4 tostadas + ½ aguacate + pimiento + cebolla + yogurt griego + chipotle" },
    { name: "Carne con papas en salsa verde + 2 tortillas", kcal: 420, p: 30, c: 42, g: 10, detail: "120g bistec + 1 papa + 2 zanahorias + tomatillos + aceite + 2 tortillas" },
    { name: "Espagueti verde con pollo + galletas", kcal: 430, p: 32, c: 40, g: 12, detail: "120g pollo + ½ taza pasta + zanahoria + pimiento + crema reducida + chile poblano + 2 paq galletas" },
    { name: "Taquitos de picadillo + 3 tortillas", kcal: 470, p: 28, c: 42, g: 16, detail: "Carne molida + frijoles + 3 tortillas + lechuga + pico de gallo + ½ aguacate" },
    { name: "Tortitas de atún + ensalada", kcal: 400, p: 34, c: 32, g: 12, detail: "1 lata atún + huevo + zanahoria + harina avena + lechuga + espinaca + elote + 2 paq galletas" },
    { name: "Tostadas de pollo gobernador", kcal: 450, p: 36, c: 34, g: 14, detail: "120g pechuga + 4 tostadas + chile poblano + cebolla + tomate + 2 tzas lechuga" },
    { name: "Fajitas de res a la mexicana + arroz", kcal: 440, p: 32, c: 38, g: 14, detail: "150g fajitas res + ¼ taza arroz + cebolla + chile poblano + tomate + aceite aguacate + 2 galletas" },
    { name: "Ensalada buffalo de pollo", kcal: 380, p: 34, c: 24, g: 14, detail: "150g pollo + 2 tzas lechuga + espinaca + elote + zanahoria + salsa buffalo + 3 paq galletas" },
    { name: "Milanesa de res a la plancha + verduras", kcal: 380, p: 36, c: 10, g: 14, detail: "150g milanesa + 1 taza brócoli + 1 taza coliflor al vapor" },
  ],
  cenas: [
    { name: "Pan pita relleno de queso", kcal: 380, p: 28, c: 30, g: 14, detail: "1 pan pita integral + 2 reb queso panela + 2 reb pechuga pavo + pimiento + cebolla + aceite oliva" },
    { name: "Calabacitas con queso + tortillas + frijoles", kcal: 370, p: 24, c: 32, g: 14, detail: "120g queso panela + ½ calabacita + cebolla + tomate + 2 tortillas + ½ taza frijoles + ⅓ aguacate" },
    { name: "Miguitas con huevo + frijoles", kcal: 360, p: 22, c: 34, g: 12, detail: "2 huevos + ¼ taza clara + 2-3 tortillas cortadas + cebolla + tomate + ½ taza frijoles + aceite" },
    { name: "Burito de huevo integral", kcal: 350, p: 22, c: 28, g: 14, detail: "2 huevos + ¼ taza clara + tortilla harina integral + espinaca + tomate + queso oaxaca" },
    { name: "Taquitos de bistec + ensalada nopales", kcal: 400, p: 30, c: 30, g: 14, detail: "120g bistec + 3 tortillas + ½ taza nopal + cebolla + tomate + ½ aguacate" },
    { name: "Huevito con jamón + tortillas + frijoles", kcal: 340, p: 26, c: 30, g: 10, detail: "2 huevos + ¼ taza clara + 1 reb pechuga pavo + cebolla + tomate + 2 tortillas + ½ taza frijoles" },
    { name: "Queso guisado + tortillas + aguacate", kcal: 380, p: 24, c: 28, g: 16, detail: "80g queso panela + cebolla + tomate + 2 tortillas + ⅓ aguacate + aceite" },
  ],
  colaciones: [
    { name: "Pan tostado + mermelada + nuez/almendra", kcal: 220, p: 5, c: 28, g: 10, detail: "1 pan tostado integral + mermelada + 7 mitades nuez o 10 almendras" },
    { name: "Manzana + galleta Stila + nuez", kcal: 200, p: 4, c: 26, g: 9, detail: "1 manzana + barrita Stila Quaker + 7 mitades nuez o 10 almendras" },
    { name: "Tortitas de arroz + crema cacahuate + plátano", kcal: 280, p: 7, c: 36, g: 12, detail: "2 tortitas arroz + 2 cdas crema cacahuate + 1 plátano rebanado" },
    { name: "Licuado de plátano con avena", kcal: 290, p: 6, c: 40, g: 10, detail: "1 taza leche vegetal + 1 plátano + 3 cdas avena + 7 mitades nuez" },
    { name: "Fruta + nuez/almendra", kcal: 160, p: 3, c: 22, g: 8, detail: "1 porción fruta (manzana, mandarina, naranja, melón) + 7 mitades nuez o 10 almendras" },
    { name: "Bites energéticos (2 bolitas 30g c/u)", kcal: 180, p: 5, c: 24, g: 8, detail: "Plátano + avena + 2 cditas miel + crema cacahuate reducida — versión Oscar" },
    { name: "Barrita K-Gear", kcal: 153, p: 21, c: 19, g: 3, detail: "21g proteína, 0g azúcar añadida — aprobada como post-entreno" },
    { name: "Yogur griego Yoplait + fruta", kcal: 200, p: 18, c: 20, g: 3, detail: "200g yogur griego natural + 1 porción fruta" },
  ],
};

const tabs = [
  { key: "desayunos", label: "Desayunos" },
  { key: "comidas", label: "Comidas" },
  { key: "cenas", label: "Cenas" },
  { key: "colaciones", label: "Colaciones" },
];

const colors = {
  desayunos: { bg: "bg-orange-50", badge: "bg-orange-500", border: "border-orange-300", text: "text-orange-700" },
  comidas: { bg: "bg-green-50", badge: "bg-green-600", border: "border-green-300", text: "text-green-700" },
  cenas: { bg: "bg-blue-50", badge: "bg-blue-600", border: "border-blue-300", text: "text-blue-700" },
  colaciones: { bg: "bg-purple-50", badge: "bg-purple-500", border: "border-purple-300", text: "text-purple-700" },
};

export default function App() {
  const [tab, setTab] = useState("desayunos");
  const [open, setOpen] = useState(null);
  const c = colors[tab];

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Calorías por Platillo</h1>
        <p className="text-xs text-gray-500">Plan nutrióloga — Meta: 1,700–1,800 kcal/día en déficit</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 mb-4 text-xs text-yellow-800 flex gap-2">
        <span>🎯</span>
        <span>Desayuno ~420 kcal · Colación ~200 kcal · Comida ~430 kcal · Cena ~370 kcal = ~1,420 kcal base. Agrega colación post-entreno en días de gym.</span>
      </div>

      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
        {tabs.map(({ key, label }) => (
          <button key={key} onClick={() => { setTab(key); setOpen(null); }}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${tab === key ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {meals[tab].map((m, i) => (
          <div key={i} className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden shadow-sm`}>
            <button className="w-full flex items-center justify-between p-3 gap-2" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center gap-2 text-left flex-1">
                <span className={`${c.badge} text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap`}>{m.kcal} kcal</span>
                <p className={`font-semibold text-sm ${c.text}`}>{m.name}</p>
              </div>
              <span className="text-gray-400 text-xs">{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div className="px-4 pb-3 space-y-2">
                <p className="text-xs text-gray-500">{m.detail}</p>
                <div className="flex gap-3">
                  <div className="bg-white rounded-lg px-3 py-1 text-center border border-gray-200">
                    <p className="text-xs text-gray-400">Proteína</p>
                    <p className="font-bold text-sm text-gray-700">{m.p}g</p>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1 text-center border border-gray-200">
                    <p className="text-xs text-gray-400">Carbos</p>
                    <p className="font-bold text-sm text-gray-700">{m.c}g</p>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1 text-center border border-gray-200">
                    <p className="text-xs text-gray-400">Grasas</p>
                    <p className="font-bold text-sm text-gray-700">{m.g}g</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1 text-gray-700">💡 Cómo usar esta tabla</p>
        <p>Elige un platillo de cada tiempo de comida y suma las calorías. Si el total está entre 1,600–1,800 kcal estás en déficit. Los días de gym suma la colación post-entreno.</p>
      </div>
    </div>
  );
}
