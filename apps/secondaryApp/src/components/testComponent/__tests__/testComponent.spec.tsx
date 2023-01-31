import {render} from '@testing-library/react'
import TestComponent from '../TestComponent'


describe('<TestComponent />', () => {
  test('it renders properly', () => {
    const {getByText} = render(<TestComponent />)
    expect(getByText('TestComponent')).not.toBeNull()
  })
})