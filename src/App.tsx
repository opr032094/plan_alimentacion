import { useEffect, useMemo, useState } from 'react';
import { clavesDe, personas, planes } from './planes';
import type { Persona, Plan, Platillo, Tiempo } from './planes';
import ListaCompra from './ListaCompra';

/**
 * Interfaz de los planes de alimentación (los datos viven en `planes.ts`).
 * Dos vistas: Platillos (kcal por platillo, por persona y mes) y Lista de
 * compra (checklist para surtir la despensa, de uno o los dos planes).
 *
 * Modo impresión: con `?print` en la URL se pintan TODOS los tiempos de comida
 * con el detalle expandido (sin tabs ni acordeón) — es lo que usa el PDF.
 * `?print&plan=fernanda-2026-09` imprime un plan específico.
 */


type Vista = 'platillos' | 'compra';
const vistas: { key: Vista; label: string }[] = [
  { key: 'platillos', label: '🍽️ Platillos' },
  { key: 'compra', label: '🛒 Lista de compra' },
];

const tabs: { key: Tiempo; label: string }[] = [
  { key: 'desayunos', label: 'Desayunos' },
  { key: 'comidas', label: 'Comidas' },
  { key: 'cenas', label: 'Cenas' },
  { key: 'colaciones', label: 'Colaciones' },
];

const colors: Record<Tiempo, { bg: string; badge: string; border: string; text: string }> = {
  desayunos: { bg: 'bg-orange-50', badge: 'bg-orange-500', border: 'border-orange-300', text: 'text-orange-700' },
  comidas: { bg: 'bg-green-50', badge: 'bg-green-600', border: 'border-green-300', text: 'text-green-700' },
  cenas: { bg: 'bg-blue-50', badge: 'bg-blue-600', border: 'border-blue-300', text: 'text-blue-700' },
  colaciones: { bg: 'bg-purple-50', badge: 'bg-purple-500', border: 'border-purple-300', text: 'text-purple-700' },
};

function Macros({ m }: { m: Platillo }) {
  return (
    <div className="flex gap-3">
      {[['Proteína', m.p], ['Carbos', m.c], ['Grasas', m.g]].map(([et, v]) => (
        <div key={et as string} className="bg-white rounded-lg px-3 py-1 text-center border border-gray-200">
          <p className="text-xs text-gray-400">{et}</p>
          <p className="font-bold text-sm text-gray-700">{v}g</p>
        </div>
      ))}
    </div>
  );
}

/** Hoja desde abajo con los pasos de un platillo. Cierra con X, tocando afuera o Esc. */
function ModalReceta({ m, color, onClose }: { m: Platillo; color: (typeof colors)[Tiempo]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={m.name}
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-4 max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className={`font-bold text-base ${color.text}`}>{m.name}</p>
            <p className="text-xs text-gray-400">{m.kcal} kcal</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-gray-400 text-xl leading-none px-2">×</button>
        </div>
        <p className="text-xs font-semibold text-gray-700 mb-1">Ingredientes</p>
        <p className="text-xs text-gray-500 mb-3">{m.detail}</p>
        <p className="text-xs font-semibold text-gray-700 mb-1">Preparación</p>
        <p className="text-sm text-gray-700 leading-relaxed">{m.preparacion}</p>
        <button onClick={onClose} className="mt-4 w-full py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold">Cerrar</button>
      </div>
    </div>
  );
}

/** Todo expandido, sin interacción: la vista del PDF (`?print`). */
function VistaImpresion({ clave, plan }: { clave: string; plan: Plan }) {
  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold text-gray-800">Plan de alimentación de {plan.persona} — {plan.etiqueta}</h1>
        <p className="text-xs text-gray-500">Calorías por platillo · {plan.subtitulo} ({clave})</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 mb-4 text-xs text-yellow-800">{plan.meta}</div>
      {tabs.map(({ key, label }) => {
        const c = colors[key];
        return (
          <div key={key} className="mb-4" style={{ breakInside: 'avoid' }}>
            <h2 className={`font-bold text-sm mb-2 ${c.text}`}>{label}</h2>
            <div className="space-y-2">
              {plan.meals[key].map((m, i) => (
                <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-3`} style={{ breakInside: 'avoid' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${c.badge} text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap`}>{m.kcal} kcal</span>
                    <p className={`font-semibold text-sm ${c.text}`}>{m.name}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{m.detail}</p>
                  <Macros m={m} />
                  {m.preparacion && <p className="text-xs text-gray-600 mt-2"><span className="font-semibold">Preparación:</span> {m.preparacion}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1 text-gray-700">💡 Cómo usar esta tabla</p>
        <p>{plan.guia}</p>
      </div>
      <Extras plan={plan} />
    </div>
  );
}

/** Listas sueltas del PDF (equivalencias, bebidas…), si el plan las trae. */
function Extras({ plan }: { plan: Plan }) {
  if (!plan.extras?.length) return null;
  return (
    <div className="mt-3 space-y-2">
      {plan.extras.map((x) => (
        <div key={x.titulo} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600" style={{ breakInside: 'avoid' }}>
          <p className="font-semibold mb-1 text-gray-700">{x.titulo}</p>
          <p>{x.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const print = params.has('print');
  // `?plan=fernanda-2026-09` abre (o imprime) un plan específico.
  const planInicial = params.get('plan');
  const [persona, setPersona] = useState<Persona>(
    planInicial && planes[planInicial] ? planes[planInicial].persona : personas[0],
  );
  const [clavePlan, setClavePlan] = useState(
    planInicial && planes[planInicial] ? planInicial : clavesDe(personas[0])[0],
  );
  const [tab, setTab] = useState<Tiempo>('desayunos');
  const [open, setOpen] = useState<number | null>(null);
  const [receta, setReceta] = useState<Platillo | null>(null);
  // `?vista=compra` abre directo la lista de compra.
  const [vista, setVista] = useState<Vista>(params.get('vista') === 'compra' ? 'compra' : 'platillos');
  const clavesPlanes = clavesDe(persona);

  const cambiarPersona = (p: Persona) => {
    setPersona(p);
    setClavePlan(clavesDe(p)[0]);
    setOpen(null);
  };

  const plan = planes[clavePlan];
  const c = colors[tab];

  if (print) return <VistaImpresion clave={clavePlan} plan={plan} />;

  const navegacion = (
    <div className="flex rounded-xl overflow-hidden border border-gray-300 mb-4">
      {vistas.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setVista(key)}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${vista === key ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  if (vista === 'compra') {
    return (
      <div className="max-w-2xl mx-auto p-4 font-sans">
        {navegacion}
        <ListaCompra />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      {navegacion}
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold text-gray-800">Calorías por Platillo</h1>
        <p className="text-xs text-gray-500">Plan de la nutrióloga · {plan.subtitulo}</p>
      </div>

      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-3">
        {personas.map((p) => (
          <button
            key={p}
            onClick={() => cambiarPersona(p)}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${persona === p ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <label className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-600">
        Mes:
        <select
          value={clavePlan}
          onChange={(e) => { setClavePlan(e.target.value); setOpen(null); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 bg-white"
        >
          {clavesPlanes.map((k) => (
            <option key={k} value={k}>{planes[k].etiqueta}</option>
          ))}
        </select>
      </label>

      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 mb-4 text-xs text-yellow-800 flex gap-2">
        <span>🎯</span>
        <span>{plan.meta.replace('🎯 ', '')}</span>
      </div>

      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setTab(key); setOpen(null); }}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${tab === key ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {plan.meals[tab].map((m, i) => (
          <div key={i} className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden shadow-sm`}>
            <button className="w-full flex items-center justify-between p-3 gap-2" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center gap-2 text-left flex-1">
                <span className={`${c.badge} text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap`}>{m.kcal} kcal</span>
                <p className={`font-semibold text-sm ${c.text}`}>{m.name}</p>
              </div>
              <span className="text-gray-400 text-xs">{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && (
              <div className="px-4 pb-3 space-y-2">
                <p className="text-xs text-gray-500">{m.detail}</p>
                <Macros m={m} />
                {m.preparacion && (
                  <button
                    onClick={() => setReceta(m)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold ${c.badge} text-white`}
                  >
                    🍳 Cómo se prepara
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1 text-gray-700">💡 Cómo usar esta tabla</p>
        <p>{plan.guia}</p>
      </div>
      <Extras plan={plan} />
      {receta && <ModalReceta m={receta} color={c} onClose={() => setReceta(null)} />}
    </div>
  );
}
