import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render,fireEvent} from '@testing-library/react'
import Poruka from './Poruka'
import { element } from 'prop-types'

test('renderira sadrzaj', () => {
  const poruka = {
    sadrzaj: 'Testiranje komponenti',
    vazno: true
  }

  const komponenta = render(
    <Poruka poruka={poruka} />
  )

  expect(komponenta.container).toHaveTextContent('Testiranje komponenti')
  
  const element=komponenta.getByText('Testiranje komponenti')
  expect(element).toBeDefined()

  const div=komponenta.container.querySelector('.poruka')
  expect(div).toBeDefined()
})


test('klik poziva event handler', () => {
    const poruka = {
      sadrzaj: 'Testiranje komponenti',
      vazno: true
    }
   
    const testHandler = jest.fn()
   
    const komponenta = render(
      <Poruka poruka={poruka} promjenaVaznosti={testHandler} />
    )

    // komponenta.debug()
    const button = komponenta.getByText('označi kao nevažno')
    fireEvent.click(button)
   
    expect(testHandler.mock.calls).toHaveLength(1)
   
  })

  

