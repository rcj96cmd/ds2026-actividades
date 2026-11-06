import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import type { Usuario } from '../types/sesionType';
import PrivateRoute from './PrivateRoute';

const admin: Usuario = { id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' };
const cliente: Usuario = { id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' };

function renderRuta(usuario: Usuario | null, cargando = false) {
  const auth = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: string) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <MemoryRouter initialEntries={['/libros/nuevo']}>
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/login" element={<h1>Página de login</h1>} />
          <Route path="/sin-permiso" element={<h1>Sin permiso</h1>} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<h1>Formulario de libro</h1>} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe('PrivateRoute con rol ADMIN', () => {
  it('sin sesión: redirige a /login', () => {
    renderRuta(null);
    expect(screen.getByRole('heading', { name: 'Página de login' })).toBeInTheDocument();
    expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
  });

  it('CLIENTE: redirige a /sin-permiso', () => {
    renderRuta(cliente);
    expect(screen.getByRole('heading', { name: 'Sin permiso' })).toBeInTheDocument();
    expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
  });

  it('ADMIN: muestra la ruta hija en el Outlet', () => {
    renderRuta(admin);
    expect(screen.getByRole('heading', { name: 'Formulario de libro' })).toBeInTheDocument();
  });

  it('mientras carga la sesión: no redirige ni muestra la ruta hija', () => {
    renderRuta(null, true);
    expect(screen.queryByText('Página de login')).not.toBeInTheDocument();
    expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
  });
});
