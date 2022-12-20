import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import PorukaForma from './PorukaForma'


test('<PorukaForma /> poziva Submit',()=>{

    const stvoriPoruku=jest.fn()

    const komponenta=render(
        <PorukaForma spremiPoruku={stvoriPoruku} />

    )

    const input=komponenta.container.querySelector('input')
    const forma=komponenta.container.querySelector('form')

    fireEvent.change(
        input,{
            'target': 'testiranje forme'
        }
    )

    fireEvent.submit(forma)

    expect(stvoriPoruku.mock.calls).toHaveLength(1)
    expect(stvoriPoruku.mock.calls[0][0].sadrzaj).toBe('...unesi poruku')
    

})
