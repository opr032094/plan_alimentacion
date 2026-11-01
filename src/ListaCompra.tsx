import { useEffect, useMemo, useState } from 'react';
import { clavesDe, personas, planes } from './planes';
import type { Persona } from './planes';

/**
 * Lista de compra para surtir la despensa: checklist de los insumos de uno o
 * los dos planes (el más reciente de cada persona). Los checks y la selección
 * viven en localStorage de ESTE teléfono; no se comparten entre dispositivos.
 */

const LLAVE = 'plan_compra_v1';

interface Guardado {
  personas: Persona[];
  checks: string[]; // ids de renglón ya comprados
}

function leer(): Guardado {
  try {
    const raw = localStorage.getItem(LLAVE);
    if (raw) {
      const g = JSON.parse(raw) as Partial<Guardado>;
      const ps = (g.personas ?? []).filter((p): p is Persona => personas.includes(p as Persona));
      return { personas: ps.length ? ps : [...personas], checks: Array.isArray(g.checks) ? g.checks : [] };
    }
  } catch { /* sin storage o JSON roto: arrancamos limpio */ }
  return { personas: [...personas], checks: [] };
}

function guardar(g: Guardado) {
  try { localStorage.setItem(LLAVE, JSON.stringify(g)); } catch { /* sin storage: se pierde al recargar */ }
}

// Mismo insumo escrito igual en dos planes = un solo renglón.
const idDe = (seccion: string, item: string) => `${seccion}|${item}`.toLowerCase().trim();

// Mes del plan vigente de cada persona ("Sep", "Oct"), para ver qué alimenta la lista.
const mesCorto = (p: Persona) => {
  const clave = clavesDe(p)[0];
  return clave ? planes[clave].etiqueta.split(' ')[0].slice(0, 3) : '';
};

interface Renglon { id: string; nombre: string; de: Persona[] }
interface Seccion { titulo: string; renglones: Renglon[] }

function armarSecciones(seleccion: Persona[]): Seccion[] {
  const orden: string[] = [];
  const porSeccion = new Map<string, Map<string, Renglon>>();
  for (const persona of personas) {
    if (!seleccion.includes(persona)) continue;
    const clave = clavesDe(persona)[0];
    if (!clave) continue;
    for (const s of planes[clave].compras) {
      if (!porSeccion.has(s.titulo)) { porSeccion.set(s.titulo, new Map()); orden.push(s.titulo); }
      const m = porSeccion.get(s.titulo)!;
      for (const item of s.items) {
        const id = idDe(s.titulo, item);
        const r = m.get(id);
        if (r) r.de.push(persona);
        else m.set(id, { id, nombre: item, de: [persona] });
      }
    }
  }
  return orden.map((titulo) => ({
    titulo,
    renglones: [...porSeccion.get(titulo)!.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
  }));
}

export default function ListaCompra() {
  const [estado, setEstado] = useState<Guardado>(leer);
  useEffect(() => guardar(estado), [estado]);

  const secciones = useMemo(() => armarSecciones(estado.personas), [estado.personas]);
  const checks = useMemo(() => new Set(estado.checks), [estado.checks]);
  const total = secciones.reduce((n, s) => n + s.renglones.length, 0);
  const comprados = secciones.reduce((n, s) => n + s.renglones.filter((r) => checks.has(r.id)).length, 0);
  const ambos = estado.personas.length > 1;

  const alternarPersona = (p: Persona) => {
    const ya = estado.personas.includes(p);
    if (ya && estado.personas.length === 1) return; // siempre queda al menos un plan
    setEstado({ ...estado, personas: ya ? estado.personas.filter((x) => x !== p) : [...estado.personas, p] });
  };

  const alternarCheck = (id: string) => {
    const s = new Set(estado.checks);
    if (s.has(id)) s.delete(id); else s.add(id);
    setEstado({ ...estado, checks: [...s] });
  };

  const reiniciar = () => {
    if (comprados === 0) return;
    if (window.confirm(`¿Desmarcar los ${comprados} que ya llevas? Es para empezar una compra nueva.`)) {
      setEstado({ ...estado, checks: [] });
    }
  };

  return (
    <div>
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold text-gray-800">Lista de compra</h1>
        <p className="text-xs text-gray-500">Marca lo que ya va en el carrito · se guarda en este teléfono</p>
      </div>

      <div className="flex gap-2 justify-center mb-3">
        {personas.map((p) => {
          const activo = estado.personas.includes(p);
          return (
            <button
              key={p}
              onClick={() => alternarPersona(p)}
              aria-pressed={activo}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${activo ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-300'}`}
            >
              {activo ? '✓ ' : ''}{p}
              <span className="font-normal opacity-70"> · {mesCorto(p)}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-bold">{comprados}</span> de <span className="font-bold">{total}</span> en el carrito
        </p>
        <button
          onClick={reiniciar}
          disabled={comprados === 0}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 bg-white disabled:opacity-40"
        >
          ↺ Reiniciar lista
        </button>
      </div>

      {secciones.map((s) => {
        // Cada renglón se queda en su lugar al palomearse: si te equivocas,
        // lo encuentras donde estaba. Solo cambia el estilo.
        const listos = s.renglones.filter((r) => checks.has(r.id)).length;
        return (
          <div key={s.titulo} className="mb-4">
            <h2 className="font-bold text-sm text-gray-700 mb-2 flex justify-between">
              <span>{s.titulo}</span>
              <span className="text-gray-400 font-normal">{listos}/{s.renglones.length}</span>
            </h2>
            <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 bg-white">
              {s.renglones.map((r) => {
                const hecho = checks.has(r.id);
                return (
                  <label key={r.id} className={`flex items-center gap-3 px-3 py-3 cursor-pointer ${hecho ? 'bg-gray-50' : ''}`}>
                    <input
                      type="checkbox"
                      checked={hecho}
                      onChange={() => alternarCheck(r.id)}
                      className="w-5 h-5 accent-gray-800 shrink-0"
                    />
                    <span className={`flex-1 text-sm ${hecho ? 'line-through text-gray-400' : 'text-gray-800'}`}>{r.nombre}</span>
                    {ambos && r.de.length === 1 && (
                      <span className="text-[10px] uppercase tracking-wide text-gray-400">{r.de[0]}</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
