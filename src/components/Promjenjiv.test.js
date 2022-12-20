import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Promjenjiv from './Promjenjiv'

describe('Komponenta <Promjenjiv />', () => {

  let komponenta

  beforeEach(() => {
    komponenta = render(
      <Promjenjiv natpis='prikazi...'>
        <div className='testDiv' />
      </Promjenjiv>
    )
  })
  
  test('renderiranje djece', () =>{
    expect(
      komponenta.container.querySelector('.testDiv')
    ).not.toBeFalsy()
  })

  test('na početku djeca nisu prikazana', () => {
    const div = komponenta.container.querySelector('.promjenjiviSadrzaj')

    expect(div).toHaveStyle('display: none')
  })

  test('nakon klika, djeca se prikazuju', () =>{
    const button = komponenta.getByText('prikazi...')
    fireEvent.click(button)
  
    const div = komponenta.container.querySelector('.promjenjiviSadrzaj')
    expect(div).not.toHaveStyle('display: none')
  
  })

  test('prikazani sadrzaj se moze sakriti', () =>{
    komponenta.debug()
    const button = komponenta.container.querySelector('button')
    fireEvent.click(button)

    const odustaniButton1 = komponenta.container.querySelector(
      'button:nth-child(2)'
    )

    const odustaniButton = komponenta.getByText('Odustani')
    fireEvent.click(odustaniButton)
    
    const div = komponenta.container.querySelector('.promjenjiviSadrzaj')
    expect(div).toHaveStyle('display: none')

  })
})