import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Poruka from './Poruka'

test('renderira sadrzaj', () => {
  const poruka = {
    sadrzaj: 'Testiranje komponenti',
    vazno: true
  }

  const komponenta = render(
    <Poruka poruka={poruka} />
  )

  expect(komponenta.container).toHaveTextContent('Testiranje komponenti')
  
})