import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PokemonPage,HomePage,BuscarPagina  } from './pages/barril';
import {Navigator}  from './components/Navigator'

export const AppRouter = () => {

        return (
            <Routes>
                <Route path='/' element={<Navigator />}>
                    <Route index element={<HomePage />} />
                    <Route path='pokemon/:id' element={<PokemonPage />} />
                    <Route path='search' element={<BuscarPagina  />} />
                </Route>
    
                <Route path='*' element={<Navigator to='/' />} />
            </Routes>
        );
    };
  
